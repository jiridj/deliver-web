<script setup>
const props = defineProps(['order']);
</script>

<template>
  <div
    class="container"
    style="padding-left: 75px;"
  >
    <div class="row">
      <table class="table mt-3 mb-5">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Title</th>
            <th
              scope="col"
              class="text-end"
            >Unit Price</th>
            <th
              scope="col"
              class="text-end"
            >Quantity</th>
            <th
              scope="col"
              class="text-end"
            >Total Price</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="line in order.orderLines">
            <tr>
              <th scope="row">
                <a
                  :href="`/product/${line.product.number}`"
                  class="link-dark"
                >{{ line.product.number }}
                </a>
              </th>
              <td>{{ line.product.title }}</td>
              <td class="text-end">{{ line.product.price }}</td>
              <td class="text-end">{{ line.quantity }}</td>
              <td class="text-end">{{ line.total }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>