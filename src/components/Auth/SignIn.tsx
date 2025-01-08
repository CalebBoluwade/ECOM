"use client";

import { Heart, Package, UserRound } from "lucide-react";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface SignInModalProps {
  isModalOpen?: boolean;
  openCloseSignInModal?: Dispatch<SetStateAction<boolean>>;
}

const SignInModal: React.FC<SignInModalProps> = () => {
  const { data: session } = useSession();
  return (
    <div>
      {/* <Modal open={isModalOpen} onCancel={() => openCloseSignInModal(false)}> */}
      {session ? (
        <div className="p-4">
          <div className="--flex space-y-8 items-center">
            <div className="flex items-center gap-3">
              {session && session.user && (
                <Image
                  src={session.user.picture || session.user.image!}
                  alt="Profile"
                  className="w-28 h-28 rounded-full"
                  width={200}
                  height={200}
                  onError={() => <UserRound />}
                />
              )}
              <p className="text-gray-700">{session!.user?.name}</p>
            </div>

            <div>
              <Link
                className="flex items-center px-6 py-3 bottom-b hover:bg-gray-100 transition-colors"
                href={"/wishlist"}
              >
                <Heart className="h-5 w-5 mr-3 text-gray-600" />
                Wishlist
              </Link>

              <Link
                className="flex items-center px-6 py-3 bottom-b hover:bg-gray-100 transition-colors"
                href={"/wishlist"}
              >
                <Package className="h-5 w-5 mr-3 text-gray-600" />
                Orders
              </Link>

              {session && (session.user ? session.user.isAdmin : false) && (
                <Link
                  href={session.user ? "/admin" : ""}
                  className="inline-flex items-center gap-2 w-max border-r py-3 px-2"
                >
                  Admin
                </Link>
              )}
            </div>

            <button
              onClick={() => signOut()}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        // <div className="p-3 flex items-center justify-center bg-gray-50">
        <div className="w-full --max-w-md --bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
          <p className="text-gray-600 text-sm text-center mb-8">
            Sign in with your Google account to access the admin dashboard.
          </p>

          <div className="mb-4">
            <button
              className="w-full px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-700"
              onClick={() => signIn("google", { redirect: true })}
            >
              Sign in with Google
            </button>
          </div>
        </div>
        // {/* </div> */}
      )}
    </div>
  );
};

export default SignInModal;

// export async function getServerSideProps() {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }
