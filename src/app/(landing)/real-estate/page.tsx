"use client"

import HeroSection from "@/components/landing/HeroSection";
import { EnvironmentOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import Image from "next/image";

const ArrowIcon = () => (
  <Image
    src="/images/icons/45deg_arrow.svg"
    alt="Arrow Icon"
    width={24}
    height={24}
  />
);

const listings = [
  {
    title: "Maple Haven Apartments",
    location: "Toronto, ON",
    price: "$1,800/month",
    bedrooms: "1 bedroom",
    image: "/images/listings/maple_haven.jpg",
  },
  {
    title: "The Aurora Lofts",
    location: "Calgary, AB",
    price: "$1,400/month",
    bedrooms: "1 bedroom",
    image: "/images/listings/aurora_lofts.jpg",
  },
  {
    title: "Pacific Breeze Residences",
    location: "Vancouver, BC",
    price: "$2,000/month",
    bedrooms: "1 bedroom",
    image: "/images/listings/pacific_breeze.jpg",
  },
  {
    title: "Prairie Sunrise Apartments",
    location: "Winnipeg, MB",
    price: "$1,100/month",
    bedrooms: "2 bedroom",
    image: "/images/listings/prairie_sunrise.jpg",
  },
  {
    title: "Northern Lights Flats",
    location: "Edmonton, AB",
    price: "$1,250/month",
    bedrooms: "1 bedroom",
    image: "/images/listings/northern_lights.jpg",
  },
  {
    title: "The St. Lawrence Suites",
    location: "Montreal, QC",
    price: "$1,300/month",
    bedrooms: "Studio",
    image: "/images/listings/st_lawrence.jpg",
  },
  {
    title: "Riverfront Heights",
    location: "Ottawa, ON",
    price: "$1,600/month",
    bedrooms: "2 bedroom",
    image: "/images/listings/riverfront_heights.jpg",
  },
  {
    title: "Wellesley St East Parliament",
    location: "Toronto, ON",
    price: "$1,800/month",
    bedrooms: "1 bedroom",
    image: "/images/listings/wellesley_st.jpg",
  },
];

const { Text, Title } = Typography;

export default function RealEstatePage() {
  return (
    <>
      <HeroSection
        backgroundImage="/images/landing/real_estate_hero_section.jpg"
        title="Find the Perfect Space—Tailored to Your Needs."
        subtitle="Browse homes, apartments, and commercial spaces with ease"
        buttonText="Explore Listings"
        buttonLink="/listings"
      />

      <section className="mt-10 px-4 md:px-16">
        <Row gutter={[16, 16]} justify="center">
          {listings.map((listing, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: "180px",
                      backgroundImage: `url(${listing.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                }
                styles={{ body: { padding: 16 } }}
                className="shadow-md rounded-xl"
              >
                <Title level={5}>{listing.title}</Title>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Text>
                    <EnvironmentOutlined style={{ marginRight: "8px" }} />
                    {listing.location}
                  </Text>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <Text>
                    <HomeOutlined style={{ marginRight: "8px" }} />
                    {listing.bedrooms}
                  </Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text className="text-lg font-semibold">{listing.price}</Text>
                  <Button
                    shape="circle"
                    icon={<ArrowIcon />}
                    size="large"
                    color="danger"
                    variant="filled"
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}
