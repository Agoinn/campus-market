<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

import { useItemsStore } from '@/stores/items'
import { CATEGORIES, CONDITIONS, type Category, type Condition } from '@/types'
import { categoryCover } from '@/utils/category'

const router = useRouter()
const itemsStore = useItemsStore()
const submitting = ref(false)

const form = reactive({
  title: '',
  price: '',
  category: '' as Category | '',
  condition: '九成新' as Condition,
  description: '',
  seller: '',
  campus: '山西工程技术学院',
})

function validate(): string | null {
  if (!form.title.trim()) return '给商品起个标题'
  if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) return '价格要大于 0'
  if (!form.category) return '选一个分类'
  if (!form.description.trim()) return '写两句描述，卖得更快'
  if (!form.seller.trim()) return '留个称呼，方便同学联系'
  return null
}

async function onSubmit() {
  const error = validate()
  if (error) {
    showToast(error)
    return
  }

  submitting.value = true
  await new Promise((resolve) => window.setTimeout(resolve, 250))

  const item = itemsStore.add({
    title: form.title.trim(),
    price: Number(form.price),
    category: form.category as Category,
    condition: form.condition,
    description: form.description.trim(),
    seller: form.seller.trim(),
    campus: form.campus.trim() || '山西工程技术学院',
    cover: categoryCover[form.category as Category],
  })

  submitting.value = false
  showToast('发布成功')
  router.replace(`/item/${item.id}`)
}
</script>

<template>
  <main class="page publish">
    <header class="publish__header">
      <h1 class="display">发布一件闲置</h1>
      <p>写清楚成色和价格，卖得更快。</p>
    </header>

    <van-form @submit="onSubmit">
      <div class="form-card">
        <van-field
          v-model="form.title"
          name="title"
          label="标题"
          placeholder="例如：考研数学全套"
          maxlength="30"
          show-word-limit
        />
        <van-field v-model="form.price" name="price" type="number" label="价格" placeholder="0" />
        <van-field
          v-model="form.seller"
          name="seller"
          label="称呼"
          placeholder="怎么称呼你"
          maxlength="10"
        />
        <van-field
          v-model="form.campus"
          name="campus"
          label="校区"
          placeholder="山西工程技术学院"
        />
        <van-field
          v-model="form.description"
          name="description"
          label="描述"
          type="textarea"
          rows="3"
          autosize
          maxlength="200"
          show-word-limit
          placeholder="成色、入手时间、有没有磕碰，写清楚更容易成交"
        />
      </div>

      <section class="form-section">
        <h2 class="display">分类</h2>
        <div class="chip-row">
          <button
            v-for="category in CATEGORIES"
            :key="category"
            class="chip"
            :class="{ 'chip--active': form.category === category }"
            type="button"
            @click="form.category = category"
          >
            {{ category }}
          </button>
        </div>
      </section>

      <section class="form-section">
        <h2 class="display">成色</h2>
        <div class="chip-row">
          <button
            v-for="condition in CONDITIONS"
            :key="condition"
            class="chip"
            :class="{ 'chip--active': form.condition === condition }"
            type="button"
            @click="form.condition = condition"
          >
            {{ condition }}
          </button>
        </div>
      </section>

      <div class="form-submit">
        <van-button block type="primary" native-type="submit" :loading="submitting">
          发布
        </van-button>
        <p>发布会保存在本机，刷新页面也不会丢。</p>
      </div>
    </van-form>
  </main>
</template>

<style scoped>
.publish__header {
  padding: 8px 0 18px;
}

.publish h1 {
  font-size: 28px;
  line-height: 1.2;
}

.publish__header p {
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 13px;
}

.form-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.publish :deep(.van-cell) {
  background: var(--surface);
}

.publish :deep(.van-field__label) {
  color: var(--ink);
}

.form-section {
  margin-top: 20px;
}

.form-section h2 {
  margin-bottom: 10px;
  font-size: 16px;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: transparent;
  color: var(--ink-soft);
  font-size: 13px;
  cursor: pointer;
}

.chip--active {
  border-color: var(--ink);
  background: var(--ink);
  color: #fff;
}

.form-submit {
  margin-top: 28px;
}

.form-submit :deep(.van-button) {
  border-radius: 4px;
}

.form-submit p {
  margin-top: 10px;
  color: var(--ink-soft);
  font-size: 12px;
  text-align: center;
}
</style>
