<template>
  <div class="tags-main">
    <div class="tags-container">
     <div v-for="(item,index) in props.tags" :key="index">
      <div class="tag-container">
         <span class="tag-name">{{item}}</span>
         <button @click="removeTag(index)">
            <i class="far fa-times-circle"></i>
         </button>
      </div>
      </div>
      <div class="input-wrapper">
        <input @keyup.enter="addTag" v-model="tagInput" type="text"  placeholder="Enter tag..."/>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent,PropType,ref } from 'vue'

export default defineComponent({
    name: 'smart-tags',
    emit: ['on-change'],
    props:{
        tags: {
          type: Array as PropType<string[]>,
          default: []
        }
    },
    setup(props,{emit}) {
       const tagInput = ref('')

       const addTag = () => {
         if(tagInput.value.length > 0){
          props.tags.push(tagInput.value)
          tagInput.value = ''
          emit('on-change', props.tags)
         }
       }

       const removeTag = (index : number) => {
          props.tags.splice(index,1)
          emit('on-change', props.tags)
       }

       return {
          props ,
          tagInput,
          addTag,
          removeTag
       }
    },
})
</script>

<style scoped>
   .tags-main {
     color: white;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem;
  border-radius: 0.2rem; 
  background-color: #eaf1f8;
  }

input[type="text"] {
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid #000;
  font-size: 1rem;
  height: 100%;
  outline: 0;
  position: relative;
  background: transparent; 
  }

.input-wrapper {
  align-self: center;
  height: 100%;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  position: relative;
  width: 200px; 
  }

.suggestion-wrapper {
  max-height: 500px;
  min-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 2rem;
  width: 100%;
  z-index: 100;
  filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.4)); 
  }
  .suggestion-wrapper.hidden {
    visibility: hidden; 
    }

.suggest-pane {
  border-radius: 0.2rem;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 0;
  width: 100%;
 }

.suggest-pane-item {
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 0.85rem;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0.4rem 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%; 
}
  .suggest-pane-item span {
    padding-left: 0.4rem; }
  .suggest-pane-item:hover {
    background: rgba(255, 255, 255, 0.2); }
  .suggest-pane-item.selected {
    background: rgba(255, 255, 255, 0.2); }

.tags-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap; }

.tags-list-enter-active,
.tags-list-leave-active {
  transition: all 0.2s; }

.tags-list-enter,
.tags-list-leave-to {
  opacity: 0; }

.tag-container {
  align-items: center;
  border-radius: 0.2rem;
  display: flex;
  filter: drop-shadow(2px 2px 4px rgba(26, 15, 15, 0.25));
  justify-content: center;
  margin: 0.4rem 0.25rem;
  padding: 0.4rem 0.1rem 0.4rem 0.4rem;
  user-select: none; 
  background-color: #6c757d;
  }
  .tag-container.highlight {
    background-color: #b20000; }
  .tag-container.no-remove {
    padding-right: 0.5rem; }

.tag-name {
  font-size: 1rem; }

.tag-edit-input {
  width: 0;
  min-width: 100px;
  outline: 0;
  border: 0;
  background: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem; }

button {
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  border: 0;
  display: flex;
  height: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.2rem;
  outline: none;
  width: 1rem;
  padding: 0;
  cursor: pointer; }

.icon-wrapper {
  width: 0.5rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center; }
  .icon-wrapper svg {
    width: 100%;
    height: 100%;
    fill: #000; }

</style>
