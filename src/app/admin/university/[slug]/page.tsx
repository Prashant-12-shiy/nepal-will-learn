"use client";
import { useGetUniversityBySlug } from "@/features/admin/university/api/use-get-university-slug";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { PageLoader } from "@/components/page-loader";
import Link from "next/link";

const UniversityPage = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading } = useGetUniversityBySlug(params.slug);
  const university = data?.university;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!university) {
    return <div>University not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto text-center">
          <Image
            src={university?.logo}
            alt="University Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h1 className="text-4xl font-bold mt-4">{university.name}</h1>
          <p className="mt-2 text-lg">{university.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About {university.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Location:</strong> {university.location}
            </p>
            <p>
              <strong>Established Year:</strong> {university.establishedYear}
            </p>
            <p>
              <strong>Accreditation:</strong> {university.accreditation}
            </p>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Courses Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {university.courses.map((course: string, index: number) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Facilities Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {university.facilities.map((facility: string, index: number) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Gallery Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {university.images.map((image: string, index: number) => (
                <div key={index} className="relative h-64">
                  <Image
                    src={image}
                    alt={`University Image ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Email:</strong> {university.email}
            </p>
            <p>
              <strong>Phone:</strong> {university.phone}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <Link href={university.website} className="text-blue-600" rel="noopener noreferrer" target="_blank">
                {university.website}
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Social Media Section */}
        <Card>
          <CardHeader>
            <CardTitle>Follow Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <Link
                  href={university.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href={university.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href={university?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href={university?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} {university.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UniversityPage;
