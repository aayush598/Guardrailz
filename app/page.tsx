'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Shield, Lock, Zap, CheckCircle, ArrowRight, Code, Key, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-slate-900">Guardrails</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => router.push('/sign-in')}>
              Sign In
            </Button>
            <Button onClick={() => router.push('/sign-up')} className="bg-indigo-600 hover:bg-indigo-700">
              Get Started
            </Button>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Secure Your LLM Applications</span>
          </div>
          
          <h1 className="text-6xl font-bold text-slate-900 mb-6">
            Enterprise-Grade
            <br />
            <span className="text-indigo-600">LLM Guardrails</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Protect your AI applications with intelligent guardrails. Detect PII, prevent prompt injection, 
            and ensure compliance with built-in and custom security profiles.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              onClick={() => router.push('/sign-up')}
              className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Documentation
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <Card className="border-2 hover:border-indigo-200 transition-all">
            <CardContent className="pt-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Validation</h3>
              <p className="text-slate-600">
                Detect secrets, PII, and malicious patterns in user inputs before they reach your LLM.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-indigo-200 transition-all">
            <CardContent className="pt-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Output Sanitization</h3>
              <p className="text-slate-600">
                Automatically redact sensitive information from LLM responses to prevent data leaks.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-indigo-200 transition-all">
            <CardContent className="pt-6">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Parallel Processing</h3>
              <p className="text-slate-600">
                Execute multiple guardrails simultaneously for maximum speed and efficiency.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Built-in Profiles */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Pre-Built Security Profiles</h2>
          <p className="text-center text-slate-600 mb-10">Choose from industry-specific guardrail configurations</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Default', desc: 'Basic security for general use', icon: '🛡️' },
              { name: 'Enterprise Security', desc: 'Strict controls for businesses', icon: '🏢' },
              { name: 'Child Safety', desc: 'Maximum protection for kids', icon: '👶' },
              { name: 'Healthcare', desc: 'HIPAA-compliant guardrails', icon: '🏥' },
              { name: 'Financial', desc: 'Compliance for fintech', icon: '💰' },
              { name: 'Minimal', desc: 'Development & testing', icon: '🔧' },
            ].map((profile) => (
              <Card key={profile.name} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl">{profile.icon}</span>
                    <div>
                      <h4 className="font-semibold text-lg">{profile.name}</h4>
                      <p className="text-sm text-slate-600">{profile.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <Key className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Generate API Key</h3>
              <p className="text-slate-600">Create your API key from the dashboard in seconds</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <Code className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Integrate API</h3>
              <p className="text-slate-600">Add our REST API or SDK to your application</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <BarChart3 className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Monitor & Analyze</h3>
              <p className="text-slate-600">Track usage and guardrail performance in real-time</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border-2 border-indigo-100">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <div className="text-5xl font-bold text-indigo-600 mb-2">₹0</div>
          <p className="text-xl text-slate-600 mb-6">Free Tier - Get Started Today</p>
          <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
            {[
              '10,000 requests per day',
              '100 requests per minute',
              'All built-in profiles',
              'Custom profile creation',
              'Full API access',
              'Usage analytics',
            ].map((feature) => (
              <li key={feature} className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            size="lg" 
            onClick={() => router.push('/sign-up')}
            className="bg-indigo-600 hover:bg-indigo-700 text-lg px-12"
          >
            Start Building Now
          </Button>
          <p className="text-sm text-slate-500 mt-4">No credit card required • Free forever</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>&copy; 2025 LLM Guardrails. Secure your AI applications.</p>
        </div>
      </footer>
    </div>
  );
}