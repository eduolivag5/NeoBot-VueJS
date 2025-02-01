<template>
    <div class="flex gap-2">
        <div v-for="model in models" :key="model.id"
            class="flex-1 flex gap-2 items-center p-2 justify-center rounded-lg border border-zinc-800 transition-colors duration-300 group"
            :class="{
                'bg-zinc-800': selectedModel === model.id,
                'opacity-50 cursor-not-allowed': !model.active,
                'hover:bg-zinc-800': model.active
            }"
            @click="model.active ? selectModel(model.id) : null"
        >                   
            <img :src="`/icons/${model.icon}.svg`" alt="Icono del modelo" class="h-8 w-8 md:h-10 md:w-10">
            <div>
                <p class="text-sm md:text-base font-bold line-clamp-1">{{ model.company }}</p>
                <p class="text-xs md:text-sm text-gray-400 line-clamp-1">{{ model.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Models",
        data() {
            return {
                models: [
                    { id: "gpt-4", name: "GPT-4", company: 'OpenAI', icon: "chatgpt-icon", active: true },
                    { id: "deepseek-r1", name: "DeepSeek-R1", company: 'Deepseek', icon: "deepseek-logo-icon", active: false },
                    /* { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", company: 'OpenAI', icon: "chatgpt-icon", active: false }, */
                ],
                selectedModel: "gpt-4",
            };
        },
        methods: {
            selectModel(modelId) {
                this.selectedModel = modelId;
                this.$emit("update:model", modelId);
            },
        },
    };
</script>
