<template>
    <div class="typewriter h-6 text-indigo-400">
        <p class="text-sm md:text-lg font-mono inline-block break-words">
            {{ currentText }}
        </p>
    </div>
</template>
  
<script>
    export default {
        data() {
        return {
            frases: [
                "¿En qué puedo ayudarte hoy?",
                "Estoy aquí para ofrecerte mi asistencia.",
                "No dudes en preguntarme lo que necesites.",
                "Tu experiencia es importante, pregúntame cualquier cosa.",
                "¡Estoy listo para resolver tus dudas!",
                "Hazme cualquier pregunta, estaré encantado de ayudar.",
                "¿Te gustaría saber algo nuevo hoy?",
                "Explora todo lo que puedo hacer por ti.",
                "Puedo ayudarte con tareas, búsquedas y mucho más.",
                "Déjame ayudarte a encontrar lo que buscas."
            ],
            currentText: "",
            currentIndex: 0,
            isWriting: true,
            typingSpeed: 100,
            deletingSpeed: 50,
            pauseTime: 2000,
        };
        },
        methods: {
        typeWriter() {
            const currentPhrase = this.frases[this.currentIndex];
            if (this.isWriting) {
            if (this.currentText.length < currentPhrase.length) {
                this.currentText += currentPhrase.charAt(this.currentText.length);
                setTimeout(this.typeWriter, this.typingSpeed);
            } else {
                setTimeout(() => {
                this.isWriting = false;
                setTimeout(this.typeWriter, this.pauseTime);
                }, this.pauseTime);
            }
            } else {
            if (this.currentText.length > 0) {
                this.currentText = this.currentText.slice(0, -1);
                setTimeout(this.typeWriter, this.deletingSpeed);
            } else {
                this.currentIndex = (this.currentIndex + 1) % this.frases.length;
                this.isWriting = true;
                setTimeout(this.typeWriter, this.pauseTime);
            }
            }
        },
        },
        mounted() {
        this.typeWriter();
        },
    };
</script>
  