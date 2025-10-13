<section id="contact" class="py-20 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 -z-10 pointer-events-none">
        <div class="absolute top-0 right-1/4 w-96 h-96 bg-[#f53003]/5 dark:bg-[#f53003]/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-[#F8B803]/5 dark:bg-[#F8B803]/10 rounded-full blur-3xl">
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <!-- Left - Info -->
            <div class="lg:sticky lg:top-24">

                <h2 class="text-5xl lg:text-6xl font-bold mb-6">
                    <span class="bg-gradient-to-r from-[#f53003] to-[#F8B803] bg-clip-text text-transparent">
                        Get In
                    </span>
                    <br>
                    <span class="text-[#1b1b18] dark:text-[#eeeeec]">
                        Touch With Me
                    </span>
                </h2>

                <p class="text-lg text-[#706f6c] dark:text-[#A1A09A] mb-12 max-w-lg">
                    Have a project or idea? Let's collaborate to make it happen!
                </p>

                <!-- Contact Info -->
                <div class="space-y-4">
                    <a href="mailto:{{ $profile['email'] ?? '2341720088@student.polinema.ac.id' }}"
                        class="flex items-start gap-4 p-4 rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] hover:border-[#f53003] dark:hover:border-[#f53003] transition-all group">
                        <div
                            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#f53003]/10 text-[#f53003] text-xl flex-shrink-0">
                            📧
                        </div>
                        <div>
                            <div class="font-bold mb-1 group-hover:text-[#f53003] transition-colors">Email</div>
                            <div class="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                {{ $profile['email'] ?? '2341720088@student.polinema.ac.id' }}
                            </div>
                        </div>
                    </a>

                    <a href="{{ $profile['linkedin'] ?? 'https://www.linkedin.com/in/muhammad-irsyad-dimas-abdillah-46424738a/' }}"
                        target="_blank"
                        class="flex items-start gap-4 p-4 rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] hover:border-[#f53003] dark:hover:border-[#f53003] transition-all group">
                        <div
                            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#f53003]/10 text-[#f53003] text-xl flex-shrink-0">
                            💼
                        </div>
                        <div>
                            <div class="font-bold mb-1 group-hover:text-[#f53003] transition-colors">LinkedIn</div>
                            <div class="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Let's connect professionally!
                            </div>
                        </div>
                    </a>

                    <a href="{{ $profile['github'] ?? 'https://github.com/Dimas0824' }}" target="_blank"
                        class="flex items-start gap-4 p-4 rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] hover:border-[#f53003] dark:hover:border-[#f53003] transition-all group">
                        <div
                            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#f53003]/10 text-[#f53003] text-xl flex-shrink-0">
                            💻
                        </div>
                        <div>
                            <div class="font-bold mb-1 group-hover:text-[#f53003] transition-colors">GitHub</div>
                            <div class="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                See my code here!
                            </div>
                        </div>
                    </a>
                </div>

                <!-- Additional Info -->
                <div
                    class="mt-12 p-6 rounded-lg bg-gradient-to-br from-[#f53003]/5 to-[#F8B803]/5 border border-[#e3e3e0] dark:border-[#3E3E3A]">
                    <div class="text-sm font-medium mb-2 text-[#706f6c] dark:text-[#A1A09A]">Response Time</div>
                    <div
                        class="text-2xl font-bold bg-gradient-to-r from-[#f53003] to-[#F8B803] bg-clip-text text-transparent">
                        Maximum 24 hours
                    </div>
                </div>
            </div>

            <!-- Right - Form -->
            <div
                class="bg-white dark:bg-[#161615] p-8 lg:p-12 rounded-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                <form action="#" method="POST" class="space-y-6">
                    @csrf

                    <div>
                        <label for="name" class="block text-sm font-medium mb-2">
                            Your Name <span class="text-[#f53003]">*</span>
                        </label>
                        <input type="text" id="name" name="name" required placeholder="Dimas"
                            class="w-full px-4 py-3 border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-transparent focus:outline-none focus:border-[#f53003] dark:focus:border-[#FF4433] transition-colors">
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium mb-2">
                            Your Email <span class="text-[#f53003]">*</span>
                        </label>
                        <input type="email" id="email" name="email" required placeholder="Dimas@gmail.com"
                            class="w-full px-4 py-3 border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-transparent focus:outline-none focus:border-[#f53003] dark:focus:border-[#FF4433] transition-colors">
                    </div>

                    <div>
                        <label for="subject" class="block text-sm font-medium mb-2">
                            Subject <span class="text-[#f53003]">*</span>
                        </label>
                        <input type="text" id="subject" name="subject" required placeholder="Project Collaboration"
                            class="w-full px-4 py-3 border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-transparent focus:outline-none focus:border-[#f53003] dark:focus:border-[#FF4433] transition-colors">
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium mb-2">
                            Your Message <span class="text-[#f53003]">*</span>
                        </label>
                        <textarea id="message" name="message" rows="6" required placeholder="Describe your project here..."
                            class="w-full px-4 py-3 border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-transparent focus:outline-none focus:border-[#f53003] dark:focus:border-[#FF4433] transition-colors resize-none"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1b1b18] dark:bg-[#eeeeec] text-white dark:text-[#1C1C1A] rounded-sm hover:bg-black dark:hover:bg-white transition-all hover:scale-[1.02] font-medium">
                        <span>Send Message</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>

                    <p class="text-xs text-center text-[#706f6c] dark:text-[#A1A09A]">
                        By submitting this form, you agree to be contacted regarding your inquiry.
                    </p>
                </form>
            </div>

        </div>
    </div>
</section>
