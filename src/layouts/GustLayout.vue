<script setup>
// You can add any required imports or logic here
</script>

<template>
  <div class="min-h-screen bg-white-600 font-Poppins">
    <!-- Navigation Header -->
    <!-- <nav class="bg-[#1F1F1F] p-4 shadow-default">
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <div class="text-white-700 text-2xl font-bold">Your Logo</div>
        </div>
      </div>
    </nav> -->

    <!-- Main Content Area -->
    <main class="container mx-auto px-6 md:px-8 bg-[#f4f6f9]">
      <!-- Router View for Page Content -->
      <div class="bg-white-700 rounded-lg shadow-default">
        <router-view></router-view>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-primary-800 text-white-700 p-4 mt-8">
      <div class="container mx-auto text-center text-sm">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style></style>
