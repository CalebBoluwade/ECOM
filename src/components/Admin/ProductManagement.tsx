import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Plus, Edit, Trash2, X, ImagePlus } from "lucide-react";
import Image from "next/image";
import { connect } from "react-redux";
import { RootState, useAppDispatch } from "@/lib/store/store";
import {
  deleteSingleProduct,
  fetchProducts,
} from "@/lib/store/actions/Products";
import { useStaticFunctions } from "@/src/hooks/antd";
import { CreateProduct, EditProduct } from "@/lib/actions/product";
import { calculateItemPrice, formatPrice } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { capitalize } from "lodash";

const ProductManagement = ({
  products,
  brands,
  distinctCategories,
}: {
  products: IProduct[];
  brands: IBrand[];
  distinctCategories: string[];
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { message } = useStaticFunctions();
  const dispatch = useAppDispatch();
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>({
    slug: (products.length + 1).toString(),
    name: "",
    description: "",
    price: 0,
    categories: [],
    quantity: 0,
    currency: "NGN",
    discountPercentage: 0,
    images: [],
    manufacturer: {
      name: "",
      image: "",
      slug: "",
    },
    specifications: [],
    cartQuantity: 1,
    warranty: "",
    reviews: [],
    isFeatured: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState<{
    open: boolean;
    type: "Create" | "Edit";
  }>({ open: false, type: "Create" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      // router.push("/auth");
    }

    console.log(session);
  }, [status, router, session]);

  const handleAddProduct = () => {
    setIsDialogOpen({ type: "Create", open: true });
    const newProduct: IProduct = {
      slug: (products.length + 1).toString(),
      name: "",
      description: "",
      price: 0,
      categories: [],
      quantity: 0,
      currency: "NGN",
      discountPercentage: 0,
      images: [],
      manufacturer: {
        name: "",
        image: "",
        slug: "",
      },
      specifications: [],
      cartQuantity: 1,
      warranty: "",
      reviews: [],
      isFeatured: false,
    };
    setSelectedProduct(newProduct);
  };

  const handleEditProduct = (product: IProduct) => {
    setIsDialogOpen({ open: true, type: "Edit" });
    setSelectedProduct(product);
  };

  const handleAddSpecification = () => {
    if (selectedProduct && newSpecKey && newSpecValue) {
      const newSpec: Specification = {
        key: newSpecKey,
        value: newSpecValue,
      };

      setSelectedProduct({
        ...selectedProduct,
        specifications: [...selectedProduct.specifications, newSpec],
      });

      // Reset input fields
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const handleRemoveSpecification = (index: number) => {
    if (selectedProduct) {
      const updatedSpecs = selectedProduct.specifications.filter(
        (_, i) => i !== index
      );
      setSelectedProduct({
        ...selectedProduct,
        specifications: updatedSpecs,
      });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct && e.target.files) {
      const files = Array.from(e.target.files);

      // Convert files to base64
      const imagePromises = files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((base64Images) => {
        // Limit to 3 images
        const newImages = [...selectedProduct.images, ...base64Images].slice(
          0,
          3
        );

        setSelectedProduct({
          ...selectedProduct,
          images: newImages,
        });
      });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (selectedProduct) {
      const updatedImages = selectedProduct.images.filter(
        (_, index) => index !== indexToRemove
      );
      setSelectedProduct({
        ...selectedProduct,
        images: updatedImages,
      });
    }
  };

  const handleSaveProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedProduct) {
      const updatedProducts = products.some(
        (p) => p.slug === selectedProduct.slug
      )
        ? products.map((p) =>
            p.slug === selectedProduct.slug ? selectedProduct : p
          )
        : [...products, selectedProduct];

      // setProducts(updatedProducts);
      console.log(updatedProducts);

      if (isDialogOpen.type === "Create") {
        CreateProduct(selectedProduct);

        message.success({ content: "Product Created successfully" });
      } else {
        message.success({ content: "Product saved successfully" });
        EditProduct(selectedProduct);
      }

      dispatch(fetchProducts());
      setIsDialogOpen((prev) => ({ ...prev, open: false }));

      // setSelectedProduct(null);
    }
  };

  const handleDeleteProduct = (slug: string) => {
    // setProducts(products.filter((p) => p.slug !== productId));
    deleteSingleProduct(slug);

    dispatch(fetchProducts());
    message.success({ content: "Product deleted successfully" });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="border shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Product Management
          </h2>
          <button
            type="button"
            // variant="outlined"
            onClick={handleAddProduct}
            className="flex items-center bg-lime-500 px-4 py-2 rounded-md --hover:bg-lim-600 transition-colors"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                {[
                  "Name",
                  "Description",
                  "Price",
                  "Discount",
                  "Category",
                  "Inventory",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-ellipsis"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.slug} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-3 py-4 whitespace-break-spaces break-words text-sm max-w-36">
                    {product.description.slice(0, 20)}
                    {product.description.length > 20 && "..."}
                  </td>
                  <td className="px-3 py-4 inline-flex flex-row gap-3 items-center whitespace-nowrap">
                    {formatPrice(
                      calculateItemPrice(
                        product.price,
                        product.discountPercentage
                      ),
                      product.currency
                    )}

                    {product.discountPercentage ? (
                      <span className="text-gray-400 text-sm line-through">
                        {formatPrice(product.price, product.currency)}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {product.discountPercentage}%
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {product.categories}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    Count: {product.quantity}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap flex --space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEditProduct(product)}
                      className="text-lim-500 hover:text-lim-700 p-2 rounded-md hover:bg-lim-50 transition-colors"
                    >
                      {" "}
                      <p className="sr-only">Edit</p>
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.slug)}
                      type="button"
                      className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-colors"
                    >
                      <p className="sr-only">Delete</p>
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal Dialog */}
      {isDialogOpen.open && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSaveProduct}
            className="bg-gray-700 rounded-lg shadow-xl w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isDialogOpen.type === "Edit"
                  ? "Edit Product"
                  : "Add New Product"}
              </h2>
              <button
                // variant="outlined"
                onClick={() =>
                  setIsDialogOpen((prev) => ({ ...prev, open: false }))
                }
                className="hover:text-red-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  title="name"
                  type="text"
                  required
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lim-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  title="description"
                  value={selectedProduct.description}
                  required
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lim-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Manufacturer Name
                  </label>

                  <select
                    title="Manufacturer"
                    value={selectedProduct.manufacturer.name}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        manufacturer: {
                          name: e.target.value,
                          image: "",
                          slug: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    <option value="">Select Manufacturer Brand</option>
                    {(brands ?? []).map((dc, _) => (
                      <option key={_} value={dc.slug}>
                        {capitalize(dc.name)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Warranty
                  </label>
                  <input
                    title="Warranty"
                    type="text"
                    required
                    value={selectedProduct.warranty}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        warranty: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* Specifications Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specifications
                  </label>
                  <div className="space-y-2">
                    {selectedProduct.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="font-medium">{spec.key}:</span>
                        <span>{spec.value}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecification(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <p className="sr-only">remove</p>
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Key"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSpecification}
                    className="mt-2 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Add Specification
                  </button>
                </div>
              </div>

              {/* <div className="space-y-4"> */}
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Images (Max 3)
                </label>
                <div className="flex space-x-2 mb-2">
                  {selectedProduct.images.map((img, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={img}
                        alt={`Product ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        title="remove file"
                        // variant="outlined"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {selectedProduct.images.length < 3 && (
                    <button
                      type="button"
                      title="upload file"
                      // variant="outlined"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center rounded hover:border-lime-500"
                    >
                      <ImagePlus className="" />
                    </button>
                  )}
                </div>
                <input
                  title="fsg"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    title="price"
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: parseFloat(e.target.value) ?? 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lim-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    title="category"
                    value={selectedProduct.categories.length > 1 ? selectedProduct.categories[-1] : ""}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        categories: [
                          ...selectedProduct.categories,
                          e.target.value,
                        ],
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lim-500"
                  >
                    <option value="">Select Category</option>
                    {distinctCategories.map((dc, _) => (
                      <option key={_} value={dc}>
                        {capitalize(dc)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Inventory
                  </label>
                  <input
                    title="quantity"
                    type="number"
                    min={0}
                    value={selectedProduct.quantity}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Discount
                  </label>
                  <input
                    title="discount"
                    type="number"
                    max={100}
                    value={selectedProduct.discountPercentage}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        discountPercentage: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                // variant="outlined"
                onClick={() =>
                  setIsDialogOpen((prev) => ({ ...prev, open: false }))
                }
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-lime-500 rounded-md hover:bg-lime-700 transition-colors"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  randomFeaturedProduct:
    state.products.allProducts[
      Math.floor(Math.random() * state.products.allProducts.length)
    ],
  products: state.products.allProducts,
  brands: state.products.partnerBrands,
  distinctCategories: state.products.filters.categories,
});

export default connect(mapStateToProps, null)(ProductManagement);
