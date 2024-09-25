import { useEffect } from "react"
import { baseUrl } from "../../utils/constants"
import { loadFromLocalStorage } from "../../utils/localStorage";
import { useState } from "react";

export function MyReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/customer/get_review`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        }).then((res) => res.json())
            .then((data) => {
                setReviews(data);
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
                My All Reviews
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
                                        Salon Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                        Salon Address
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
                                {
                                    reviews.map((review: any) => (
                                        <tr className="hover:bg-gray-50">
                                            <th className="px-6 py-4 font-medium text-gray-900">{review?.salonName}</th>
                                            <th className="px-6 py-4 font-medium text-gray-900">{review?.salonAddress}</th>
                                            <td className="px-6 py-4">{new Date(review?.date).toLocaleDateString('en-GB')}</td>
                                            <td className="px-6 py-4">{new Date(review?.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                                            <td className="px-6 py-4">{review?.reviewText}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>

        </div>
    )
}