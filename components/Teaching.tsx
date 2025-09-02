import { Button } from "@/components/ui/button"
import { Clock, User, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function Teaching() {
  const features = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Personalized",
      subtitle: "Curriculum",
      description: "No one-size-fits-all. I build a roadmap just for you—based on how you think, play, and learn."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible",
      subtitle: "Scheduling",
      description: "Learning should fit your life. My lessons are online, adaptable, and always human."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Proven",
      subtitle: "Success",
      description: "From Roblox games to real websites—my students finish what they start, and have fun doing it."
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
            Teaching with Purpose
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-32">
          <div>
            <div className="space-y-6 text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              <p>
                <strong className="text-black">Hi, I&apos;m Youness —</strong><br />
                I turn curiosity into real coding power. I&apos;ve taught over 3 years, helping kids build their first game, website and script
              </p>
            </div>

            <Button className="bg-brand-green hover:bg-brand-green/90 text-black font-bold text-lg px-8 py-4 rounded-lg">
              Start With a Free 30-Minute Call
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              {/* Cat illustration */}
              <div className="relative">
                <Image
                  src="/images/cat.png"
                  alt="Cute cat mascot coding on a laptop"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {features.map((feature, index) => (
            <div key={index} className="text-left max-w-64">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    {feature.title}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-600">
                    {feature.subtitle}
                  </h4>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="text-center">
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight">
            &ldquo;The best teacher I&apos;ve ever had. I didn&apos;t just learn code, I built things I&apos;m proud of.&rdquo;
          </blockquote>

          <cite className="text-lg md:text-xl text-gray-600 font-medium">
            — Student name, age
          </cite>
        </div>
      </div>
    </section>
  )
}