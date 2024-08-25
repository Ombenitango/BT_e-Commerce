<script>

  import {
    Button,
    Drawer,
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    Sidebar,
    SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup,
    SidebarItem, SidebarWrapper
  } from "flowbite-svelte";
  import {
    ArrowRightToBracketOutline,
    CartSolid,
    ChartPieSolid, EditOutline, GridSolid,
    MailBoxSolid, RectangleListOutline,
    ShoppingBagSolid,
    UsersSolid
  } from "flowbite-svelte-icons";
  import {sineIn} from "svelte/easing";

  let hidden2 = false;
  let spanClass = 'flex-1 ms-3 whitespace-nowrap';
  let activateClickOutside = false;
  let transitionParams = {
    x: -250,
    duration: 200,
    easing: sineIn
  };
  let backdrop=false;

  function toggleDrawer() {
    hidden2 = !hidden2;
    backdrop=false;
    activateClickOutside=true;
  }
  </script>

<style>
  @media screen and (max-width: 1023px) {
    #sidebar2{
      display: none!important;
    }
  }
</style>

  <div class="flex h-screen bg-gray-900 text-gray-200">
    <div class="flex flex-col">

      <div class="relative px-8">
        <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
          <Button pill={true} outline={true} class="!p-2 lg:hidden md:block  dark:text-white" size="xl" on:click={() => toggleDrawer()}>
            <RectangleListOutline class="w-6 h-6 text-white" />
          </Button>
          <NavBrand href="/">
            <img src="/logo.svg" class="me-3 h-6 sm:h-9" alt="idris elecrto logo">
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Idris Elecrto
            </span>
          </NavBrand>

          <NavUl>
            <NavLi href="/" active={true}>Home</NavLi>
            <!--            <NavLi href="/about">About</NavLi>-->
          </NavUl>
        </Navbar>
      </div>
      <!-- Main content -->
      <div class="relative left-0 right-0 flex" style="top:60px">
        <div class="relative">
          <Drawer {activateClickOutside} backdrop={backdrop} transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2" style="top:71px;">
            <Sidebar>
              <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
                <SidebarGroup>
                  <SidebarItem label="Dashboard" href="/admin">
                    <svelte:fragment slot="icon">
                      <ChartPieSolid
                              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                    </svelte:fragment>
                  </SidebarItem>
<!--                  <SidebarDropdownWrapper label="E-commerce">-->
<!--                    <svelte:fragment slot="icon">-->
<!--                      <CartSolid-->
<!--                              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>-->
<!--                    </svelte:fragment>-->
<!--                    <SidebarDropdownItem label="Products"/>-->
<!--                    <SidebarDropdownItem label="Billing"/>-->
<!--                    <SidebarDropdownItem label="Invoice"/>-->
<!--                  </SidebarDropdownWrapper>-->
<!--                -->
<!--                  <SidebarItem label="Inbox" {spanClass}>-->
<!--                    <svelte:fragment slot="icon">-->
<!--                      <MailBoxSolid-->
<!--                              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>-->
<!--                    </svelte:fragment>-->
<!--                    <svelte:fragment slot="subtext">-->
<!--                      <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>-->
<!--                    </svelte:fragment>-->
<!--                  </SidebarItem>-->
                  <SidebarItem label="Orders" href="/admin/orders" active={true}>
                    <svelte:fragment slot="icon">
                      <ShoppingBagSolid
                              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Products">
                    <svelte:fragment slot="icon">
                      <ShoppingBagSolid
                              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Users">
                    <svelte:fragment slot="icon">
                      <UsersSolid
                              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                    </svelte:fragment>
                  </SidebarItem>

                </SidebarGroup>
              </SidebarWrapper>
            </Sidebar>
          </Drawer>
        </div>

        <div class="absolute pr-80 pt-8 pl-8" style="left: 320px; height: 91vh; width: 100vw; overflow-y: auto; overflow-x: hidden;">

          <slot/>
        </div>

      </div>
    </div>
  </div>


