import NavBar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pricingCards } from '@/constants/landing-page';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { features } from 'process';
import React from 'react';

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <NavBar />
      <section className="flex-grow">
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4">
          <span className="text-orange bg-orange/20 dark:bg-orange/10 px-4 py-2 rounded-full text-sm">
            An AI powered sales assistant chatbot
          </span>
          <Image
            src="/images/logo.png"
            width={500}
            height={100}
            alt="logo"
            className="max-w-xs object-contain md:max-w-lg"
          />
          <p className="text-center max-w-[90%] sm:max-w-[500px] text-gray-700 dark:text-gray-300">
            Your AI powered sales assistant! Embed Zenda AI into any website
            with just a snippet of code!
          </p>
          <Link
            href="/dashboard"
            className="bg-orange px-4 py-2 rounded-sm text-white"
          >
            Start For Free
          </Link>
          <Image
            src="/images/iphonecorinna.png"
            width={400}
            height={100}
            alt="iphone zenda logo"
            className="max-w-lg object-contain"
          />
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-10 mb-30">
        <h2 className="text-4xl text-center text-gray-800 dark:text-gray-100">
          Choose what fits you right
        </h2>
        <p className="text-muted-foreground text-center max-w-[90%] sm:max-w-lg dark:text-gray-400">
          Our straightforward pricing model is tailored to your needs. If
          {"you're"} just starting out, we have a free plan for you.
        </p>
      </section>
      <div className="flex justify-center gap-4 flex-wrap mt-6 mb-10">
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={clsx(
              'w-[90%] sm:w-[300px] flex flex-col justify-between',
              {
                'border-2 border-primary': card.title === 'Ultimate',
                'dark:bg-gray-800 dark:border-gray-700': true,
              },
            )}
          >
            <CardHeader>
              <CardTitle className="text-orange">{card.title}</CardTitle>
              <CardDescription className="dark:text-gray-400">
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold dark:text-gray-100">
                {card.price}
              </span>
              <span className="text-muted-foreground dark:text-gray-400">
                <span>/ month</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div key={feature} className="flex gap-2 dark:text-gray-300">
                    <Check className="text-orange" />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashboard?plan=${card.title}`}
                className="bg-[#f3d299] hover:bg-[#f0c988] border-orange border-2 p-2 w-full text-center font-bold rounded-md text-gray-800 transition-colors duration-200"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
              © 2024 Zenda AI. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Powered by{' '}
              <Link
                href="https://ematpro.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:underline"
              >
                ematpro.dev
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
