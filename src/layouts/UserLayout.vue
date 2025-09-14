<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SideMenu from "@/components/SideMenu.vue";
</script>
<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <SideMenu />
    <!-- Main Content -->
    <div class="flex flex-col flex-grow">
      <Header />
      <main class="flex-grow p-6 bg-[#f4f6f9]">
        <slot></slot>
      </main>
      <Footer />
    </div>
  </div>
</template>
<style lang="scss">
.border-gradient-b {
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, #878c96, transparent);
  }
}
</style>
