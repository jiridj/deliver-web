<script setup>
const props = defineProps({ page: Number, pages: Number, size: Number, link: String });

const numPages = parseInt(props.pages);
const large = numPages > 5;
</script>

<template>
  <div class="d-flex justify-content-center">
    <div>
      <nav aria-label="page-navigation">
        <ul class="pagination">
          <!-- FIRST AND PREVIOUS -->
          <li
            class="page-item"
            :class="page == 1 ? 'disabled' : ''"
            v-if="large"
          >
            <a
              class="page-link"
              :href="`/${link}?page=1&size=${size}`"
            >&lt;&lt;</a>
          </li>
          <li
            class="page-item"
            :class="page == 1 ? 'disabled' : ''"
          >
            <a
              class="page-link"
              :href="`/${link}?page=${page - 1}&size=${size}`"
            >&lt;</a>
          </li>

          <!-- PAGE NUMBERS -->
          <template v-for="n in pages">
            <li
              class="page-item"
              :class="n == page ? 'active' : ''"
              :aria-current="n == page ? 'page' : ''"
              v-if="!large || (n <= 5 && page <= 3) || ((page - 2) <= n && n <= (page + 2)) || (page > (numPages - 3) && ((numPages - 4) <= n))"
            >
              <a
                class="page-link"
                :href="`/${link}?page=${n}&size=${size}`"
              >{{ n }}</a>
            </li>
          </template>

          <!-- NEXT AND LAST -->
          <li
            class="page-item"
            :class="page == pages ? 'disabled' : ''"
          >
            <a
              class="page-link"
              :href="`/${link}?page=${page + 1}&size=${size}`"
            >&gt;</a>
          </li>
          <li
            class="page-item"
            :class="page == pages ? 'disabled' : ''"
            v-if="large"
          >
            <a
              class="page-link"
              :href="`/${link}?page=${numPages}&size=${size}`"
            >&gt;&gt;</a>
          </li>
        </ul>
      </nav>
    </div>
    <div></div>
  </div>
</template>