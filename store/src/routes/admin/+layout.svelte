<script>
    let sidebarOpen = true;
  </script>
  
  <div class="flex h-screen bg-gray-900 text-gray-200">
    <!-- Sidebar -->
    <div class={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out bg-gray-800 w-64`}>
      <div class="flex items-center justify-center h-16 bg-gray-900 text-white">
        <h2 class="text-xl font-semibold">Flowbite</h2>
      </div>
      <nav class="mt-5">
        <a href="/admin" class="block py-2.5 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">
          Dashboard
        </a>
        <a href="/admin/orders" class="block py-2.5 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">
          Orders
        </a>
        <!-- Add more links here -->
      </nav>
    </div>
  
    <!-- Main content -->
    <div class="flex-1 flex flex-col ml-64">
      <!-- Navbar -->
      <header class="flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <div class="flex items-center">
          <button class="focus:outline-none md:hidden" on:click={() => sidebarOpen = !sidebarOpen}>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 class="text-2xl font-bold ml-4">Dashboard</h1>
        </div>
        <!-- Add navbar content (search, profile, etc.) here -->
      </header>
  
      <!-- Main dashboard content -->
    
      <div class="p-2">
        <slot/>
      </div>
      
    </div>
  </div>
  