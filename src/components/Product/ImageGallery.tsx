"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImageGallery: React.FC<Pick<IProduct, "images">> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0] ?? "");

  return (
    <div className="relative lg:w-1/2 md:w-3/5 flex flex-col items-center">
      {/* Main Image */}
      <div className="w-full h-96 mb-4">
        <Image
          src={selectedImage}
          alt="currentImage"
          width={1035}
          height={1035}
          className="max-md:min-h-[410px] max-md:max-h-[410px] md:h-full object-fit md:rounded-s-md max-md:rounded-t-md shadow-lg"
          priority
        />
      </div>

      <div className="absolute bottom-2 right-2 flex gap-4 overflow-x-auto">
        {images.map((image, index) => (
          <button
            type="button"
            title="selectImagePreview"
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-20 h-20 bg-white border-2 rounded-lg ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image
              src={image}
              width={165}
              height={165}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover w-full h-full rounded-md transition duration-500 hover:scale-105"
              priority
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
