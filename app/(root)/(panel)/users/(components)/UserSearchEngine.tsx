"use client";
import { useEffect, useState } from "react";
import userService from "@/app/api/services/userService";
import { User } from "@/app/types/User";
import UserCard from "./UserCard";
import PageMessage from "@/app/(global_components)/PageMessage";
import Loader from "@/app/(global_components)/Loader";
import Heading from "@/app/(global_components)/Heading";

export default function UserSearchEngine() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, last_page: 1 });
  const [users, setUsers] = useState([]);

  // form-data
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  async function GetClients() {
    setIsLoading(true);
    try {
      const res: any = await userService.search(page, 10, name, surname, email);
      const { data, meta } = res;
      setUsers(data);
      setMeta(meta);
      setError("");
      setIsLoading(false);
    } catch (error: any) {
      if (!error.response) {
        setError("Make sure that you filled all fields correct!");
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  function HandleSearch(e: any) {
    e.preventDefault();
    setPage(1);
    GetClients();
  }

  useEffect(() => {
    GetClients();
  }, [origin, page]);

  return (
    <div className="space-y-8">
      <div className="p-5 bg-white border border-gray-300 shadow-md rounded-2xl space-y-5">
        {error !== "" && (
          <p className="text-red-600 bg-red-50 rounded-xl px-4 py-2 text-center">
            {error}
          </p>
        )}
        <form
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 text_color"
          onSubmit={HandleSearch}
        >
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="name">ism</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="global_input"
              autoFocus
            />
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="surname">familiya</label>
            <input
              type="text"
              name="surname"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="global_input"
            />
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="email">email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="global_input"
            />
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label>tasdiqlash</label>
            <button
              className="py-2 text-center rounded-lg base_bg text-white cursor-pointer"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Qidirilmoqda..." : "Qidirish"}
            </button>
          </div>
        </form>
      </div>
      <Heading>Natijasi</Heading>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          {users && users.length > 0 ? (
            <div className="w-full gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user: User) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <PageMessage
              title="Foydalanuvchilar topilmadi!"
              message="Boshqa malumotni kiritib koring"
            />
          )}
        </div>
      )}
      <div className="w-full flex justify-center items-center">
        <div className="flex gap-5 justify-center items-center">
          <button
            className={`${
              page <= 1 && "opacity-50"
            } border-gray-300 border text-gray-800 py-2 px-4 rounded-full cursor-pointer hover:text-white hover:bg-[#26a269] hover:border-[#26a269] transition-all`}
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <h3>
            {page} / {meta.last_page}
          </h3>
          <button
            className={`${
              page >= meta.last_page && "opacity-50"
            } border-gray-300 border text-gray-800 py-2 px-4 rounded-full cursor-pointer hover:text-white hover:bg-[#26a269] hover:border-[#26a269] transition-all`}
            disabled={page >= meta.last_page}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
