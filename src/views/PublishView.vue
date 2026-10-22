<script setup lang="ts">
import { ref } from 'vue'
import {CATEGORIES, CONDITIONS,type Category,type Condition} from '@/types'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useItemsStore } from '@/stores/items'
import { categoryCover } from '@/utils/category'
const title = ref('')
const price = ref('')
const seller = ref('')
const campus = ref('山西工程技术学院')
const condition = ref<Condition>('九成新')
const category = ref<Category | ''>('')
const description = ref('')
const router = useRouter()
const itemsStore = useItemsStore()
function onSubmit(){
  if(!title.value.trim()) return showToast('给商品起个标题')
  if(!Number.isFinite(Number(price.value)) || Number(price.value) <= 0)
    return showToast('价格要大于 0')
  const cat = category.value
  if(!cat) return showToast('选一个分类')
  if(!description.value.trim()) return showToast('写两句描述,卖得更快')
  if(!seller.value.trim()) return showToast('留个称呼,方便同学联系')

  const item = itemsStore.add({
    title:title.value.trim(),
    price:Number(price.value),
    category: cat,
    condition: condition.value,
    description: description.value.trim(),
    seller: seller.value.trim(),
    campus: campus.value.trim() || '山西工程技术学院',
    cover: categoryCover[cat],
  })

  showToast('发布成功')
  router.replace(`/item/${item.id}`)
}
</script>

<template>
  <main class="page publish">
    <header class="publish__header">
      <h1 class="display">发布一件闲置</h1>
      <p>写清楚成色和价格,卖得更快</p>
    </header>

    <van-field v-model="title" label="标题" placeholder="例如 : 考研数学全套" />
    <p class="hint">已输入 {{ title.length }}</p>
    <van-field v-model="price" type="number" label="价格" placeholder="0" />
    <van-field v-model="seller" label="称呼" placeholder="怎么称呼你" maxlength="10" />
    <van-field v-model="campus" label="校区" placeholder="山西工程技术学院" />
    <section class="form-section">
      <h2 class="display">分类</h2>
      <div class="chip-row">
        <button 
          v-for="c in CATEGORIES" 
          :key="c" class="chip" 
          :class="{ 'chip--active': category === c }" 
          type="button"
          @click="category = c">
          {{ c }}
        </button>
      </div>
    </section>
    <section class="form-section">
      <h2 class="display">成色</h2>
      <div class="chip-row">
        <button 
          v-for="c in CONDITIONS"
          :key="c"
          class="chip"
          :class="{'chip--active' : condition === c}"
          type="button"
          @click="condition = c"
        >
          {{ c }}
        </button>
      </div>
    </section>
    <van-field
      v-model="description"
      label="描述"
      type="textarea"
      rows="3"
      autosize
      maxlength="200"
      show-word-limit

      placeholder="成色、入手时间、有没有磕碰,写清楚更容易成交"
      />
    <div class="form-submit">
      <van-button block type="primary" @click="onSubmit">发布</van-button>
      <p>发布会保存在手机,刷新页面也不会丢失。</p>
    </div>
  </main>
</template>
<style scoped>
.publish__header{
  padding: 8px 0 18px;
}
.publish h1{
  font-size: 28px;
  line-height: 1.2;
}
.publish__header p{
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 13px;
}
.hint{
  margin-top: 8px;
  color: var(--ink-soft);
  font-size: 12px;
}
.form-section{
  margin-top: 20px;
}
.form-section h2{
  margin-bottom: 10px;
  font-size: 16px;
}
.chip-row{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip{
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: transparent;
  color: var(--ink-soft);
  font-size: 13px;
  cursor: pointer;
}
.chip--active{
  border-color: var(--ink);
  background: var(--ink);
  color: #fff;
}
.form-submit{
  margin-top: 28px;
}
.form-submit :deep(.van-button){
  border-radius: 4px;
}
.form-submit p{
  margin-top: 10px;
  color: var(--ink-soft);
  font-size: 12px;
  text-align: center;
}
</style>