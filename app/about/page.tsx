import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Users, Zap, Shield, Heart, Award } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting event-goers worldwide with unforgettable experiences across continents.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a vibrant community of music lovers and event enthusiasts.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to deliver seamless ticketing experiences.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your security is our priority with encrypted payments and verified events.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We love events as much as you do and it shows in everything we create.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to providing the highest quality service and customer satisfaction.",
    },
  ]

  const milestones = [
    { year: "2023", title: "Founded", description: "234 WKND was born with a vision to transform event ticketing" },
    { year: "2024", title: "100K+ Tickets", description: "Reached our first major milestone of tickets sold" },
    { year: "2025", title: "Global Expansion", description: "Expanded operations to 15+ countries worldwide" },
    { year: "2026", title: "Looking Ahead", description: "Continuing to innovate and grow with our community" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-background/95 px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              About <span className="text-primary">234 WKND</span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              We're revolutionizing how people discover and experience events worldwide, one ticket at a time.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="border-y border-border bg-card px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Mission</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                At 234 WKND, we believe that extraordinary experiences should be accessible to everyone. We're dedicated
                to connecting people with the events they love, from intimate local gatherings to massive international
                festivals. Our platform empowers event organizers and delights attendees with seamless, secure, and
                reliable ticketing solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Values</h2>
              <p className="mt-3 text-muted-foreground">The principles that guide everything we do</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <Card key={value.title} className="bg-card transition-all hover:border-primary/50">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="border-t border-border bg-card px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Journey</h2>
              <p className="mt-3 text-muted-foreground">Key milestones in our story</p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    {index < milestones.length - 1 && <div className="mt-2 w-0.5 flex-1 bg-border" />}
                  </div>
                  <div className="pb-8">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      {milestone.year}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-foreground">{milestone.title}</h3>
                    <p className="mt-2 text-pretty text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary sm:text-5xl">250K+</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Tickets Sold</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary sm:text-5xl">15+</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary sm:text-5xl">500+</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Events Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary sm:text-5xl">99%</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
