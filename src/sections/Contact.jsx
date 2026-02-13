import React from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { ME } from "../content/data";

const fadeUp = {
    initial: { opacity: 0, y: 24, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function Contact() {
    const [formState, setFormState] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
        const body = encodeURIComponent(
            `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
        );
        window.location.href = `mailto:${ME.email}?subject=${subject}&body=${body}`;
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="section">
            <div className="container-page">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
                    Let's Connect
                </h2>
                <p className="mt-3 text-center text-white/70 max-w-2xl mx-auto">
                    Interested in discussing data analytics, research opportunities, or collaborating on a project?
                </p>

                <motion.div
                    {...fadeUp}
                    className="mt-12 max-w-2xl mx-auto rounded-2xl border border-blue-500/30 bg-black/60 backdrop-blur p-6 sm:p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm text-white/70 mb-1.5">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-blue-500/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/60 transition-all"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm text-white/70 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-blue-500/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/60 transition-all"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm text-white/70 mb-1.5">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-blue-500/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/60 transition-all resize-none"
                                placeholder="Tell me about your project or just say hi..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-[0_0_24px_2px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_4px_rgba(59,130,246,0.45)] hover:bg-blue-500 transition-all"
                        >
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
