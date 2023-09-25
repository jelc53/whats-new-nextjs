import { PostMetadata } from "./PostMetadata"

export default function CatalogueTable(props: PostMetadata) {
    return (
        <section className="leading-normal tracking-wider text-gray-900 bg-gray-100 rounded-lg">

            {/* <!--Container--> */}
            <div className="container w-full px-2 mx-auto md:w-4/5 xl:w-3/5">

                {/* <!--Card--> */}
                <div id='recipients' className="p-8 mt-6 bg-white rounded shadow lg:mt-0">


                    <table id="example" className="w-full pt-1 pb-1 stripe hover" >
                        <thead>
                            <tr>
                                <th data-priority="1">Name</th>
                                <th data-priority="2">Position</th>
                                <th data-priority="3">Office</th>
                                <th data-priority="4">Age</th>
                                <th data-priority="5">Start date</th>
                                <th data-priority="6">Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>
                                <td>Edinburgh</td>
                                <td>61</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>

                            {/* <!-- Rest of your data (refer to https://datatables.net/examples/server_side/ for server side processing)--> */}

                            <tr>
                                <td>Donna Snider</td>
                                <td>Customer Support</td>
                                <td>New York</td>
                                <td>27</td>
                                <td>2011/01/25</td>
                                <td>$112,000</td>
                            </tr>
                        </tbody>

                    </table>


                </div>
                {/* <!--/Card--> */}

            </div>

        </section>
    )
};
