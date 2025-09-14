<script setup></script>
<template>
  <footer
    class="w-full h-[100px] bg-primary-200 flex items-center justify-between px-8"
  >
    <div class="text-primary-600 text-sm">
      © {{ new Date().getFullYear() }} Company Name. All rights reserved.
    </div>
    <div class="flex items-center gap-6 text-primary-600 text-sm">
      <div class="flex items-center">
        <span class="mr-2">📧</span>
        info@company.com
      </div>
      <div class="flex items-center">
        <span class="mr-2">📞</span>
        +1 234 567 8900
      </div>
    </div>
  </footer>
</template>
