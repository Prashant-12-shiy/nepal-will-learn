import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="">
      <section className="bg-gradient-cartoon p-8 text-center h-[75vh] flex flex-col items-center justify-center">
        <p className="text-xl text-foreground mb-8 text-neutral-600">
          Discover fun, interactive courses and resources to help you learn,
          grow, and succeed.
        </p>
        <h1 className="font-cartoon text-7xl text-foreground mb-4 font-semibold">
          Unlock Your Learning Potential! 🚀
        </h1>
        <div className="flex justify-center gap-10 mt-10">
          <Button
            variant="outline"
            asChild
            className="relative border-2 bg-black text-xl py-5 text-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(255,0,255,1)]"
          >
            <Link href="#" className="absolute left-2">
              Explore Course
              <ArrowRight />
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="relative border-2 text-xl py-5 bg-black text-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(255,100,0,1)]"
          >
            <Link href="#" className="absolute left-2">
              Sign Up Free
            </Link>
          </Button>
        </div>
      </section>

  <section className="bg-background p-10">
  <h2 className="font-cartoon text-4xl text-foreground text-center mb-10 tracking-wide">
    Why Choose Us? 🌟
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Feature 1: Interactive Learning */}
    <div className="bg-card p-8 rounded-lg border-2 border-primary shadow-cartoon hover:scale-105 transition-transform duration-200">
      <div className="text-center">
        <div className="bg-primary rounded-full p-5 w-20 h-20 mx-auto mb-5 flex items-center justify-center">
          <span className="text-4xl">🎮</span>
        </div>
        <h3 className="font-cartoon text-2xl text-foreground mb-4">
          Interactive Learning
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Engage with fun, interactive lessons designed to make learning both enjoyable and effective.
        </p>
      </div>
    </div>

    {/* Feature 2: Expert Instructors */}
    <div className="bg-card p-8 rounded-lg border-2 border-secondary shadow-cartoon hover:scale-105 transition-transform duration-200">
      <div className="text-center">
        <div className="bg-secondary rounded-full p-5 w-20 h-20 mx-auto mb-5 flex items-center justify-center">
          <span className="text-4xl">👩‍🏫</span>
        </div>
        <h3 className="font-cartoon text-2xl text-foreground mb-4">
          Expert Instructors
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Learn from industry experts who are passionate about teaching and mentoring, ensuring quality instruction.
        </p>
      </div>
    </div>

    {/* Feature 3: Flexible Access */}
    <div className="bg-card p-8 rounded-lg border-2 border-accent shadow-cartoon hover:scale-105 transition-transform duration-200">
      <div className="text-center">
        <div className="bg-accent rounded-full p-5 w-20 h-20 mx-auto mb-5 flex items-center justify-center">
          <span className="text-4xl">📱</span>
        </div>
        <h3 className="font-cartoon text-2xl text-foreground mb-4">
          Flexible Access
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Study at your own pace, anytime, anywhere, on any device for a seamless learning experience.
        </p>
      </div>
    </div>
  </div>
</section>


      <section className="bg-gradient-cartoon p-8">
  <h2 className="font-cartoon text-4xl text-foreground text-center mb-8">
    Popular Courses 📚
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-card p-6 rounded-lg border border-border">
      <h3 className="font-cartoon text-2xl text-foreground mb-4">Math Adventures</h3>
      <p className="text-muted-foreground mb-4">
        Master math concepts through fun, interactive games and challenges.
      </p>
      <button className="button-cartoon p-2 rounded-lg">
        Enroll Now
      </button>
    </div>
    <div className="bg-card p-6 rounded-lg border border-border">
      <h3 className="font-cartoon text-2xl text-foreground mb-4">Science Explorers</h3>
      <p className="text-muted-foreground mb-4">
        Dive into the wonders of science with hands-on experiments and activities.
      </p>
      <button className="button-cartoon p-2 rounded-lg">
        Enroll Now
      </button>
    </div>
    <div className="bg-card p-6 rounded-lg border border-border">
      <h3 className="font-cartoon text-2xl text-foreground mb-4">Creative Writing</h3>
      <p className="text-muted-foreground mb-4">
        Unleash your creativity and become a storytelling pro.
      </p>
      <button className="button-cartoon p-2 rounded-lg">
        Enroll Now
      </button>
    </div>
  </div>
</section>

<section className="bg-background p-8">
  <h2 className="font-cartoon text-4xl text-foreground text-center mb-8">
    What Our Students Say 🗣️
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-card p-6 rounded-lg border border-border">
      <p className="text-muted-foreground mb-4">
        "The courses are so much fun! I never thought learning could be this enjoyable."
      </p>
      <p className="font-cartoon text-foreground">- Sarah, Age 10</p>
    </div>
    <div className="bg-card p-6 rounded-lg border border-border">
      <p className="text-muted-foreground mb-4">
        "The instructors are amazing! They make even the toughest topics easy to understand."
      </p>
      <p className="font-cartoon text-foreground">- Jake, Age 12</p>
    </div>
  </div>
</section>

<section className="bg-gradient-cartoon p-8 text-center">
  <h2 className="font-cartoon text-4xl text-foreground mb-4">
    Ready to Start Learning? 🎓
  </h2>
  <p className="text-xl text-foreground mb-8">
    Join thousands of students who are already enjoying our courses.
  </p>
  <button className="button-cartoon p-4 rounded-lg text-2xl">
    Sign Up Now
  </button>
</section>

<footer className="bg-background p-8 border-t border-border">
  <div className="flex justify-between items-center">
    <p className="text-muted-foreground">
      © 2023 Colorful Learning. All rights reserved.
    </p>
    <div className="flex gap-4">
      <a href="#" className="text-primary hover:text-primary/90">
        Privacy Policy
      </a>
      <a href="#" className="text-primary hover:text-primary/90">
        Terms of Service
      </a>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Dashboard;
