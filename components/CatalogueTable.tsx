"use client"
import { useMemo, useState } from "react";
import Link from "next/link";

export default function CatalogueTable({ data }: {data : any[]}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("desc");

    // console.log(Object.keys(data));
    const filteredAndSortedData = useMemo(() => {
        const filteredData = data.filter(item => 
            Object.values(item).some(val => 
              String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
          );

        const sortedData = [...filteredData];
        if (sortField) {
            sortedData.sort((a, b) => {
                if (a[sortField] > b[sortField]) return sortDirection === 'desc' ? -1 : 1;
                if (a[sortField] < b[sortField]) return sortDirection === 'desc' ? 1 : -1;
                return 0;
            });
        }
        return sortedData;
    }, [data, searchTerm, sortField, sortDirection]);

    const handleSort = (field : any) => {
        setSortField(field);
        setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    };

    return (
        <section className="relative flex flex-col leading-normal tracking-wider rounded-lg lg:text-lg text-slate-800 dark:text-white"> {/*lg:max-w-[85vw] lg:mx-[5vw]*/}
            <div className="w-full mb-2 font-mono">
                <input 
                type="text"
                className="sticky top-0 w-full p-2 border rounded-lg dark:bg-slate-700 bg-slate-100"
                placeholder="search ..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="w-full max-w-full overflow-x-auto rounded-lg ">
                <table className="min-w-full border ">
                    <thead className="sticky top-0 font-mono text-lg lg:text-xl">
                        {/* <tr>
                            {['uid', 'articlePublishDate', 'sketchTitle', 'articleAuthor', 'sketchAuthor'].map((field) => (
                                <th
                                    key={field}
                                    className="px-4 py-2 border-b border-gray-200"
                                    onClick={() => handleSort(field)}
                                >
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                {sortField === field && (sortDirection === 'desc' ? '▼' : '▲')}
                                </th>
                            ))}
                        </tr> */}
                        <tr>
                            <th 
                                className="px-4 py-2 border-b border-gray-200"
                                onClick={() => handleSort('uid')}
                            >
                            UID 
                            {sortField === 'uid' && (sortDirection === 'desc' ? '▼' : '▲')}
                            </th>
                            <th 
                                className="px-4 py-2 border-b border-gray-200"
                                onClick={() => handleSort('sketchPublishDate')}
                            >
                                Date
                                {sortField === 'sketchPublishDate' && (sortDirection === 'desc' ? '▼' : '▲')}
                            </th>
                            <th 
                                className="px-4 py-2 border-b border-gray-200"
                                onClick={() => handleSort('sketchTitle')}
                            >
                                Title
                                {sortField === 'sketchTitle' && (sortDirection === 'desc' ? '▼' : '▲')}
                            </th>
                            <th 
                                className="px-4 py-2 border-b border-gray-200"
                                onClick={() => handleSort('category')}
                            >
                                Field
                                {sortField === 'category' && (sortDirection === 'desc' ? '▼' : '▲')}
                            </th>
                            <th 
                                className="px-4 py-2 border-b border-gray-200"
                                onClick={() => handleSort('articleAuthor')}
                            >
                                Author
                                {sortField === 'articleAuthor' && (sortDirection === 'desc' ? '▼' : '▲')}
                            </th>
                            <th 
                                className="px-4 py-2 border-b border-gray-200"
                                onClick={() => handleSort('sketchAuthor')}
                            >
                                Written by
                                {sortField === 'sketchAuthor' && (sortDirection === 'desc' ? '▼' : '▲')}
                            </th>
                            <th 
                                className="px-4 py-2 border-b border-gray-200"
                                onClick={() => handleSort('sketchReviewer')}
                            >
                                Reviewed by
                                {sortField === 'sketchReviewer' && (sortDirection === 'desc' ? '▼' : '▲')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {filteredAndSortedData.map(item => (
                            <tr key={item.uid}>
                                <td className="px-4 break-words min-w-[50px] py-2 border-b border-gray-200">{item.uid}</td>
                                <td className="px-4 py-2 break-words min-w-[80px] border-b border-gray-200">{item.sketchPublishDate}</td>
                                <td className="px-4 break-words min-w-[300px] hover:dark:text-fuchsia-100 hover:text-fuchsia-400 py-2 border-b border-gray-200">
                                    <Link href={`/posts/${item.slug}`}>
                                        {item.sketchTitle}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 break-words min-w-[150px] border-b border-gray-200">{item.category}</td>
                                <td className="px-4 py-2 break-words min-w-[200px] border-b border-gray-200">{item.articleAuthor}</td>
                                <td className="px-4 py-2 break-words min-w-[200px] border-b border-gray-200">{item.sketchAuthor}</td>
                                <td className="px-4 py-2 break-words min-w-[200px] border-b border-gray-200">{item.sketchReviewer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
};
