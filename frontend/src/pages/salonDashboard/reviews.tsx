import { useEffect } from "react"
import { baseUrl } from "../../utils/constants"
import { loadFromLocalStorage } from "../../utils/localStorage";
import { useState } from "react";

export function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/salon/get_review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        }).then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setReviews(data);
                }
            }).catch((err) => {
                console.log(err);
            });

    }, []);


    return (
        <div>
            <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }} >
                Customer Reviews
            </h1>

            <div className="mt-10">
                {
                    reviews.length === 0 ?
                        <h1 className="mt-20 text-center text-[#3b5a979e] font-bold text-[1.2rem]">
                            No Reviews Yet
                        </h1> :
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 opacity-90">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                        Time
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                        Review
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                <tr className="hover:bg-gray-50">
                                    <th className="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
                                    <td className="px-6 py-4">Nov.4 2022</td>
                                    <td className="px-6 py-4">helen@sailboatui.com</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-3 w-3"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="flex justify-end gap-4 px-6 py-4 font-medium">
                                        <a href="">Delete</a>
                                        <a href="" className="text-primary-700">
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                }
            </div>

        </div>
    )
}