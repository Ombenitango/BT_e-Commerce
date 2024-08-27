<script>
    export let data;
    let { orders = [] } = data;

    import {TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch} from 'flowbite-svelte';

    let searchTerm = '';
    $: filteredItems = orders.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

    // Functions to handle Edit and Delete actions
    async function deleteOrder(orderId) {
      
        
        const res = await fetch(`/admin/orders/${orderId}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            // Remove the order from the local orders array
            orders = orders.filter(order => order._id !== orderId);
        } else {
            console.error("Failed to delete the order");
        }
    }

    async function updateOrderStatus(orderId, status) {
        const res = await fetch(`/admin/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        if (res.ok) {
            // Update the order status locally
            const updatedOrder = await res.json();
            orders = orders.map(order => order._id === orderId ? updatedOrder : order);
        } else {
            console.error("Failed to update the order status");
        }
    }
</script>

<div class="container">
    <div class="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={searchTerm}>
            <TableHead>
                <TableHeadCell>Index</TableHeadCell>
                <TableHeadCell>Product Name</TableHeadCell>
                <TableHeadCell>Order Status</TableHeadCell>
                <TableHeadCell>Customer Info</TableHeadCell>
                <TableHeadCell>Order Date</TableHeadCell>
                <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each filteredItems as order, i}
                    <TableBodyRow>
                        <TableBodyCell>{i + 1}</TableBodyCell>
                        <TableBodyCell class="text-wrap">{order.products[0].title}</TableBodyCell>
                        <TableBodyCell>
                            <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-200 bg-green-600 rounded-full">{order.status}</span>
                        </TableBodyCell>
                        <TableBodyCell>{order.name}<br>{order.phone}</TableBodyCell>
                        <TableBodyCell>{new Date(order._createdAt).toLocaleDateString()}</TableBodyCell>
                        <TableBodyCell>
                            <select on:change="{(e) => updateOrderStatus(order._id, e.target.value)}" class="bg-blue-950 text-white">
                                <option value="pending" selected={order.status === 'pending'}>Pending</option>
                                <option value="shipped" selected={order.status === 'shipped'}>Shipped</option>
                            </select>
                            <button class="text-red-400 hover:text-red-300 ml-4" on:click={() => deleteOrder(order._id)}>Delete</button>
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </TableSearch>
    </div>
</div>
