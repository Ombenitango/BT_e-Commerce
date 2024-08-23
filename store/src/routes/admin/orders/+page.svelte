<script >
export let data;
let { orders } = data;

</script>
<link rel="stylesheet" href="https://cdn.datatables.net/2.1.4/css/dataTables.dataTables.min.css">
<div class="container mx-auto p-12">
    <div class="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-700" id="myTable">
            <thead class="bg-gray-700">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Number Ordered</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer Info</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order Time</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-gray-800 divide-y divide-gray-700">
                <!-- Example row -->
                {#each orders as order}
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{order.total}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.products}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">3</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-200 bg-green-600 rounded-full">{order.status}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.name}<br>{order.phone}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order._createdAt}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button class="text-indigo-400 hover:text-indigo-300">Edit</button>
                        <button class="text-red-400 hover:text-red-300 ml-4">Delete</button>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>