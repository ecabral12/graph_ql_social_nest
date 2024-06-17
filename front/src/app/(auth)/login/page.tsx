"use client";
import React, { useEffect } from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { getClient, query } from "@/lib/client";
import { toast } from "react-hot-toast";
const login_mutation = gql(
  `mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}`
);

function LoginPage() {
  const [mutateFunction, { data, loading, error }] = useMutation(
    login_mutation,
    {
      variables: {
        email: "test",
        password: "test",
      },
    }
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateFunction();
      console.log(data);
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        toast.error(e.message);
      }
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">
            Connexion à votre compte
          </h2>
          <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                placeholder="Adresse e-mail"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                placeholder="Mot de passe"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <a
                  href="jajvascript:void(0);"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
