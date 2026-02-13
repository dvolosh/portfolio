import React from "react";
import { ME } from "../content/data";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur">
            <div className="container-page py-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex gap-4">
                        {ME.socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg border border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-400/50 transition-all"
                                aria-label={social.label}
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>

                    <p className="text-sm text-white/50">
                        © {currentYear} {ME.name}. All rights reserved.
                    </p>

                    <p className="text-xs text-white/40">
                        Built with React
                    </p>
                </div>
            </div>
        </footer>
    );
}
