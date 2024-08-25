<script >
export let data;
let { orders } = data;

import {TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch} from 'flowbite-svelte';

let searchTerm = '';
$: filteredItems = orders.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
</script>
<div class="container">
    <div class="bg-gray-800 shadow-md rounded-lg overflow-hidden">

        </div>


        <TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={searchTerm}>
            <TableHead>
                <TableHeadCell>Index</TableHeadCell>
                <TableHeadCell>Product Name</TableHeadCell>
                <TableHeadCell>Order Status</TableHeadCell>
                <TableHeadCell>Customer Info</TableHeadCell>
                <TableHeadCell>Order Status</TableHeadCell>
                <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each filteredItems as order,i}
                    <TableBodyRow>
                        <TableBodyCell>{i+1}</TableBodyCell>
                        <TableBodyCell class="text-wrap">{order.products[0].title}</TableBodyCell>
                        <TableBodyCell> <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-200 bg-green-600 rounded-full">{order.status}</span></TableBodyCell>
                        <TableBodyCell>{order.name}<br>{order.phone}</TableBodyCell>

                        <TableBodyCell>{order._createdAt}</TableBodyCell>

                        <TableBodyCell> <button class="text-indigo-400 hover:text-indigo-300">Edit</button><button class="text-red-400 hover:text-red-300 ml-4">Delete</button>
                        </TableBodyCell>

                    </TableBodyRow>
                {/each}
            </TableBody>
        </TableSearch>
    </div>