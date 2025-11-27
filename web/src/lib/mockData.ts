// Comprehensive mock data for the entire application

export interface Provider {
  id: number;
  name: string;
  category: string;
  tagline: string;
  rating: number;
  reviews: number;
  location: string;
  neighborhood: string;
  distance: string;
  driveTime: string;
  walkTime: string;
  phone: string;
  email: string;
  website: string;
  established: number;
  description: string;
  images: {
    url: string;
    type: string;
    title: string;
    description: string;
  }[];
  serviceCategories: {
    name: string;
    description: string;
    services: Service[];
  }[];
  packages: Package[];
  hours: {
    [key: string]: string;
  };
  stats: {
    responseTime: string;
    ranking: string;
    bookedThisWeek: number;
    bookedThisMonth: number;
    repeatCustomers: string;
    establishedYear: number;
  };
  specialties: string[];
  certifications: string[];
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  fullAddress: string;
  landmarks: string[];
  parking: {
    available: boolean;
    type: string;
    cost: string;
  };
  publicTransit: string[];
  policies: {
    cancellation: string;
    lateArrival: string;
    payment: string[];
    agePolicy: string;
  };
  safetyMeasures: string[];
  reviewsData: Review[];
  reviewBreakdown: {
    [key: number]: number;
  };
  todaySlots: string[];
  nextSlot: string;
  urgencyMessage: string;
  minPrice: number;
  maxPrice: number;
  services: string[];
  availability: string;
  isVerified: boolean;
  isPopular: boolean;
  favorite: boolean;
  badges: string[];
  profileCompletion: number;
  trustSignals: string[];
}

export interface Service {
  name: string;
  duration: string;
  price: number;
  popular?: boolean;
  description: string;
  image: string;
  benefits: string[];
  variations?: {
    duration: string;
    price: number;
  }[];
}

export interface Package {
  name: string;
  services: string[];
  duration: string;
  regularPrice: number;
  packagePrice: number;
  savings: number;
  popular?: boolean;
  description: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  verified: boolean;
  service: string;
  text: string;
  helpful: number;
  photos?: boolean;
  businessReply?: string;
}

export interface Booking {
  id: number;
  providerId: number;
  providerName: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  image: string;
  location: string;
  category: string;
  rating?: number;
  canRebook?: boolean;
  created: string;
}

export interface UserData {
  favoriteProviders: number[];
  bookings: Booking[];
  preferences: {
    location: string;
    maxDistance: number;
    priceRange: [number, number];
    categories: string[];
  };
}

// Mock Providers Data
export const mockProviders: Provider[] = [
  {
    id: 1,
    name: "Bella's Spa & Wellness",
    category: "Spa",
    tagline: "Luxury meets wellness in the heart of downtown",
    rating: 4.9,
    reviews: 245,
    location: "Downtown",
    neighborhood: "Financial District", 
    distance: "0.3 miles",
    driveTime: "2 min drive",
    walkTime: "4 min walk",
    phone: "(555) 123-4567",
    email: "hello@bellaswellness.com",
    website: "www.bellaswellness.com",
    established: 2018,
    description: "Experience luxury and relaxation at Bella's Spa & Wellness. Our expert team provides premium spa services in a serene, modern environment. We use only the finest organic products and cutting-edge techniques to ensure you leave feeling rejuvenated and refreshed.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        type: "main",
        title: "Serene Spa Environment",
        description: "Our tranquil wellness space"
      },
      {
        url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        type: "interior",
        title: "Reception & Lounge",
        description: "Welcome to our serene space"
      },
      {
        url: "https://images.unsplash.com/photo-1596178060810-0e40a4431e96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        type: "treatment",
        title: "Facial Treatment Room",
        description: "Advanced skincare treatments"
      }
    ],
    serviceCategories: [
      {
        name: "Facial Treatments",
        description: "Advanced skincare and rejuvenation",
        services: [
          {
            name: "Signature Hydrating Facial",
            duration: "60 min",
            price: 85,
            popular: true,
            description: "Deep cleansing with organic ingredients and LED light therapy",
            image: "https://images.unsplash.com/photo-1596178060810-0e40a4431e96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Hydrated skin", "Improved texture", "Natural glow"],
            variations: [
              { duration: "60 min", price: 85 },
              { duration: "90 min", price: 110 }
            ]
          },
          {
            name: "Anti-Aging Treatment",
            duration: "75 min",
            price: 125,
            description: "Collagen boosting treatment with peptides and vitamin C",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Reduced fine lines", "Firmer skin", "Youthful appearance"]
          }
        ]
      },
      {
        name: "Massage Therapy",
        description: "Therapeutic and relaxation massage",
        services: [
          {
            name: "Swedish Relaxation Massage",
            duration: "90 min",
            price: 120,
            popular: true,
            description: "Full body relaxation with organic oils and hot towels",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Deep relaxation", "Stress relief", "Muscle tension release"],
            variations: [
              { duration: "60 min", price: 90 },
              { duration: "90 min", price: 120 }
            ]
          },
          {
            name: "Hot Stone Therapy",
            duration: "90 min",
            price: 140,
            description: "Deep tissue massage with heated volcanic stones",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Deep muscle relief", "Improved circulation", "Ultimate relaxation"]
          }
        ]
      }
    ],
    packages: [
      {
        name: "Spa Day Package",
        services: ["Facial", "Massage", "Manicure"],
        duration: "3.5 hours",
        regularPrice: 270,
        packagePrice: 220,
        savings: 50,
        popular: true,
        description: "Complete relaxation experience"
      }
    ],
    hours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "8:00 AM - 9:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    stats: {
      responseTime: "Usually within 15 minutes",
      ranking: "Top 5% of providers in Downtown",
      bookedThisWeek: 28,
      bookedThisMonth: 156,
      repeatCustomers: "85%",
      establishedYear: 2018
    },
    specialties: ["Organic Products", "Certified Therapists", "Luxury Amenities", "Advanced Skincare"],
    certifications: ["Licensed Estheticians", "Massage Therapy Board Certified", "Organic Product Specialist"],
    socialMedia: {
      instagram: "@bellaswellness",
      facebook: "BellaSpaWellness",
      twitter: "@bellaswellness"
    },
    fullAddress: "123 Main Street, Suite 200, Downtown Financial District",
    landmarks: ["Next to First National Bank", "Across from City Hall"],
    parking: {
      available: true,
      type: "Street parking and nearby garage",
      cost: "Free for 2 hours with validation"
    },
    publicTransit: ["Metro Blue Line - Downtown Station (2 min walk)", "Bus lines 15, 22, 34"],
    policies: {
      cancellation: "24-hour cancellation policy. Same-day cancellations subject to 50% fee.",
      lateArrival: "Please arrive 15 minutes early. Late arrivals may result in shortened service time.",
      payment: ["Cash", "Credit/Debit Cards", "Apple Pay", "Google Pay"],
      agePolicy: "Services available for ages 16+ (under 18 requires guardian consent)"
    },
    safetyMeasures: [
      "Enhanced sanitization protocols",
      "Health screening for all clients and staff",
      "HEPA air filtration system",
      "Contactless payment options",
      "Fully licensed and insured"
    ],
    reviewsData: [
      {
        id: 1,
        name: "Sarah M.",
        rating: 5,
        date: "2 days ago",
        verified: true,
        service: "Signature Facial",
        text: "Absolutely amazing experience! The facial was incredible and the staff was so professional. My skin has never looked better. I'll definitely be back!",
        helpful: 12,
        photos: true
      },
      {
        id: 2,
        name: "Jennifer K.",
        rating: 5,
        date: "1 week ago",
        verified: true,
        service: "Hot Stone Massage",
        text: "Best spa in the city! The hot stone massage was exactly what I needed after a stressful week. The atmosphere is so relaxing and the therapist was amazing.",
        helpful: 8,
        businessReply: "Thank you Jennifer! We're so glad you enjoyed your hot stone massage. Can't wait to see you again!"
      }
    ],
    reviewBreakdown: {
      5: 198,
      4: 32,
      3: 8,
      2: 4,
      1: 3
    },
    todaySlots: ["12:30 PM", "1:00 PM", "2:30 PM", "3:00 PM", "4:00 PM", "5:30 PM"],
    nextSlot: "12:30 PM",
    urgencyMessage: "3 spots left today",
    minPrice: 65,
    maxPrice: 150,
    services: ["Facial", "Massage", "Manicure", "Body Treatment"],
    availability: "Available today",
    isVerified: true,
    isPopular: true,
    favorite: false,
    badges: ["Verified", "Popular", "Near Me"],
    profileCompletion: 95,
    trustSignals: ["Responds within 1 hour", "Booked 18 times this week"]
  },
  {
    id: 2,
    name: "Mike's Modern Barbershop",
    category: "Barbershop",
    tagline: "Classic cuts with modern style",
    rating: 4.8,
    reviews: 189,
    location: "Midtown",
    neighborhood: "Theater District",
    distance: "0.8 miles",
    driveTime: "5 min drive",
    walkTime: "12 min walk",
    phone: "(555) 234-5678",
    email: "info@mikesmodern.com",
    website: "www.mikesmodern.com",
    established: 2015,
    description: "Mike's Modern Barbershop combines traditional barbering techniques with contemporary styling. Our skilled barbers provide premium cuts, beard trims, and grooming services in a classic yet modern atmosphere.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        type: "main",
        title: "Classic Barbershop",
        description: "Traditional barbering in modern setting"
      },
      {
        url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        type: "interior",
        title: "Barber Stations",
        description: "Professional cutting stations"
      }
    ],
    serviceCategories: [
      {
        name: "Hair Services",
        description: "Professional cuts and styling",
        services: [
          {
            name: "Classic Haircut",
            duration: "45 min",
            price: 35,
            popular: true,
            description: "Precision cut with styling and finish",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Precision cut", "Professional styling", "Hot towel finish"]
          },
          {
            name: "Beard Trim & Shape",
            duration: "30 min",
            price: 25,
            description: "Expert beard trimming and shaping",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Expert shaping", "Hot towel treatment", "Beard oil finish"]
          }
        ]
      }
    ],
    packages: [
      {
        name: "The Full Service",
        services: ["Haircut", "Beard Trim", "Hot Towel"],
        duration: "75 min",
        regularPrice: 75,
        packagePrice: 60,
        savings: 15,
        description: "Complete grooming experience"
      }
    ],
    hours: {
      monday: "8:00 AM - 7:00 PM",
      tuesday: "8:00 AM - 7:00 PM",
      wednesday: "8:00 AM - 7:00 PM",
      thursday: "8:00 AM - 7:00 PM",
      friday: "8:00 AM - 8:00 PM",
      saturday: "7:00 AM - 8:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    stats: {
      responseTime: "Usually within 30 minutes",
      ranking: "Top 10% of barbershops in Midtown",
      bookedThisWeek: 24,
      bookedThisMonth: 98,
      repeatCustomers: "92%",
      establishedYear: 2015
    },
    specialties: ["Classic Cuts", "Beard Styling", "Hot Towel Service", "Traditional Shaving"],
    certifications: ["Licensed Barbers", "Traditional Shaving Certified"],
    socialMedia: {
      instagram: "@mikesmodern",
      facebook: "MikesModernBarber"
    },
    fullAddress: "456 Theater Street, Midtown District",
    landmarks: ["Near Paramount Theater", "Next to Coffee House"],
    parking: {
      available: true,
      type: "Street parking",
      cost: "Free for 1 hour"
    },
    publicTransit: ["Metro Red Line - Midtown Station (5 min walk)"],
    policies: {
      cancellation: "2-hour cancellation policy required.",
      lateArrival: "Please arrive 10 minutes early.",
      payment: ["Cash", "Credit/Debit Cards"],
      agePolicy: "All ages welcome"
    },
    safetyMeasures: [
      "Sterilized tools between clients",
      "Fresh capes for each client",
      "Regular sanitization"
    ],
    reviewsData: [
      {
        id: 1,
        name: "David R.",
        rating: 5,
        date: "3 days ago",
        verified: true,
        service: "Classic Haircut",
        text: "Best cut I've had in years! Mike really knows what he's doing. Great atmosphere and friendly service.",
        helpful: 8
      }
    ],
    reviewBreakdown: {
      5: 142,
      4: 28,
      3: 12,
      2: 5,
      1: 2
    },
    todaySlots: ["10:00 AM", "2:00 PM", "4:30 PM"],
    nextSlot: "10:00 AM",
    urgencyMessage: "Limited spots available",
    minPrice: 25,
    maxPrice: 65,
    services: ["Haircut", "Beard Trim", "Hot Towel", "Styling"],
    availability: "Available today",
    isVerified: true,
    isPopular: true,
    favorite: true,
    badges: ["Verified", "Quick Response"],
    profileCompletion: 88,
    trustSignals: ["Responds within 30 minutes", "Booked 24 times this week"]
  },
  {
    id: 3,
    name: "Sarah's Hair Studio",
    category: "Hair Salon",
    tagline: "Color specialists and creative styling",
    rating: 4.7,
    reviews: 156,
    location: "Uptown",
    neighborhood: "Arts Quarter",
    distance: "1.2 miles",
    driveTime: "8 min drive",
    walkTime: "18 min walk",
    phone: "(555) 345-6789",
    email: "hello@sarahshair.com",
    website: "www.sarahshair.com",
    established: 2019,
    description: "Sarah's Hair Studio specializes in creative color techniques and modern styling. Our talented team stays current with the latest trends while maintaining classic elegance.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        type: "main",
        title: "Modern Hair Studio",
        description: "Creative styling space"
      }
    ],
    serviceCategories: [
      {
        name: "Color Services",
        description: "Professional color and highlights",
        services: [
          {
            name: "Full Color & Cut",
            duration: "3 hours",
            price: 150,
            popular: true,
            description: "Complete color transformation with precision cut",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Color expertise", "Precision cut", "Styling included"]
          }
        ]
      }
    ],
    packages: [],
    hours: {
      monday: "9:00 AM - 9:00 PM",
      tuesday: "9:00 AM - 9:00 PM",
      wednesday: "9:00 AM - 9:00 PM",
      thursday: "9:00 AM - 9:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    stats: {
      responseTime: "Usually within 2 hours",
      ranking: "Top colorist in Arts Quarter",
      bookedThisWeek: 12,
      bookedThisMonth: 67,
      repeatCustomers: "78%",
      establishedYear: 2019
    },
    specialties: ["Color Specialist", "Balayage", "Creative Cuts"],
    certifications: ["Advanced Color Certified"],
    socialMedia: {
      instagram: "@sarahshairstudio"
    },
    fullAddress: "789 Arts Avenue, Uptown Arts Quarter",
    landmarks: ["Near Art Museum", "Arts Quarter Plaza"],
    parking: {
      available: true,
      type: "Private lot",
      cost: "Free"
    },
    publicTransit: ["Bus line 12"],
    policies: {
      cancellation: "24-hour cancellation policy required.",
      lateArrival: "Please arrive 15 minutes early for color services.",
      payment: ["Cash", "Credit/Debit Cards", "Venmo"],
      agePolicy: "All ages welcome with guardian consent under 16"
    },
    safetyMeasures: [
      "Patch testing for all color services",
      "Professional grade products only"
    ],
    reviewsData: [
      {
        id: 1,
        name: "Emma T.",
        rating: 5,
        date: "1 week ago",
        verified: true,
        service: "Full Color",
        text: "Love my new color! Sarah really listened to what I wanted and delivered perfectly.",
        helpful: 6
      }
    ],
    reviewBreakdown: {
      5: 98,
      4: 35,
      3: 15,
      2: 6,
      1: 2
    },
    todaySlots: ["4:00 PM"],
    nextSlot: "4:00 PM",
    urgencyMessage: "1 spot left today",
    minPrice: 85,
    maxPrice: 200,
    services: ["Cut & Color", "Highlights", "Styling", "Extensions"],
    availability: "Available today",
    isVerified: true,
    isPopular: true,
    favorite: false,
    badges: ["Verified", "Color Specialist"],
    profileCompletion: 92,
    trustSignals: ["Color specialist", "Booked 12 times this week"]
  },
  {
    id: 4,
    name: "Zen Nail Lounge",
    category: "Nail Salon",
    tagline: "Relaxing nail care and artistry",
    rating: 4.6,
    reviews: 203,
    location: "East Side",
    neighborhood: "Riverside",
    distance: "2.1 miles",
    driveTime: "12 min drive",
    walkTime: "25 min walk",
    phone: "(555) 456-7890",
    email: "info@zennails.com",
    website: "www.zennails.com",
    established: 2020,
    description: "Zen Nail Lounge offers premium nail care services in a tranquil, spa-like environment. From classic manicures to intricate nail art, we provide relaxing treatments for all.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        type: "main",
        title: "Zen Nail Lounge",
        description: "Peaceful nail care environment"
      }
    ],
    serviceCategories: [
      {
        name: "Nail Services",
        description: "Manicures, pedicures, and nail art",
        services: [
          {
            name: "Signature Mani-Pedi",
            duration: "90 min",
            price: 65,
            popular: true,
            description: "Complete nail care with relaxing treatments",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Relaxing soak", "Expert shaping", "Long-lasting polish"]
          }
        ]
      }
    ],
    packages: [],
    hours: {
      monday: "10:00 AM - 8:00 PM",
      tuesday: "10:00 AM - 8:00 PM",
      wednesday: "10:00 AM - 8:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "11:00 AM - 6:00 PM"
    },
    stats: {
      responseTime: "Usually within 4 hours",
      ranking: "Popular in Riverside",
      bookedThisWeek: 8,
      bookedThisMonth: 45,
      repeatCustomers: "88%",
      establishedYear: 2020
    },
    specialties: ["Nail Art", "Gel Polish", "Relaxing Treatments"],
    certifications: ["Licensed Nail Technicians"],
    socialMedia: {
      instagram: "@zennaillounge"
    },
    fullAddress: "321 Riverside Drive, East Side",
    landmarks: ["Near Riverside Park"],
    parking: {
      available: true,
      type: "Street parking",
      cost: "Free"
    },
    publicTransit: ["Bus line 8"],
    policies: {
      cancellation: "4-hour cancellation policy required.",
      lateArrival: "Please arrive on time.",
      payment: ["Cash", "Credit/Debit Cards"],
      agePolicy: "All ages welcome"
    },
    safetyMeasures: [
      "Sterilized tools",
      "Fresh liners for each pedicure"
    ],
    reviewsData: [
      {
        id: 1,
        name: "Maria L.",
        rating: 4,
        date: "5 days ago",
        verified: true,
        service: "Mani-Pedi",
        text: "Great service and very relaxing atmosphere. My nails look amazing!",
        helpful: 4
      }
    ],
    reviewBreakdown: {
      5: 124,
      4: 56,
      3: 15,
      2: 6,
      1: 2
    },
    todaySlots: [],
    nextSlot: "Friday 11:00 AM",
    urgencyMessage: "Booking ahead recommended",
    minPrice: 45,
    maxPrice: 85,
    services: ["Manicure", "Pedicure", "Nail Art", "Gel Polish"],
    availability: "Busy until Friday",
    isVerified: false,
    isPopular: true,
    favorite: false,
    badges: ["Nail Art Specialist"],
    profileCompletion: 75,
    trustSignals: ["Nail art specialist"]
  },
  {
    id: 5,
    name: "Elite Fitness & Wellness",
    category: "Fitness",
    tagline: "Transform your body and mind",
    rating: 4.8,
    reviews: 312,
    location: "West End",
    neighborhood: "Business District",
    distance: "1.5 miles",
    driveTime: "9 min drive",
    walkTime: "20 min walk",
    phone: "(555) 567-8901",
    email: "info@elitefitness.com",
    website: "www.elitefitness.com",
    established: 2017,
    description: "Elite Fitness & Wellness offers personalized training, massage therapy, and wellness services. Our certified trainers and therapists help you achieve your health and fitness goals.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        type: "main",
        title: "Elite Fitness Center",
        description: "State-of-the-art fitness facility"
      }
    ],
    serviceCategories: [
      {
        name: "Fitness Training",
        description: "Personal training and fitness programs",
        services: [
          {
            name: "Personal Training Session",
            duration: "60 min",
            price: 120,
            popular: true,
            description: "One-on-one training with certified trainer",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Personalized program", "Expert guidance", "Goal tracking"]
          }
        ]
      }
    ],
    packages: [
      {
        name: "Transformation Package",
        services: ["Personal Training", "Nutrition Plan", "Recovery Massage"],
        duration: "4 weeks",
        regularPrice: 800,
        packagePrice: 650,
        savings: 150,
        description: "Complete transformation program"
      }
    ],
    hours: {
      monday: "5:00 AM - 11:00 PM",
      tuesday: "5:00 AM - 11:00 PM",
      wednesday: "5:00 AM - 11:00 PM",
      thursday: "5:00 AM - 11:00 PM",
      friday: "5:00 AM - 11:00 PM",
      saturday: "6:00 AM - 10:00 PM",
      sunday: "7:00 AM - 9:00 PM"
    },
    stats: {
      responseTime: "Usually within 15 minutes",
      ranking: "Top fitness center in West End",
      bookedThisWeek: 31,
      bookedThisMonth: 187,
      repeatCustomers: "94%",
      establishedYear: 2017
    },
    specialties: ["Personal Training", "Recovery Therapy", "Nutrition Coaching"],
    certifications: ["NASM Certified Trainers", "Licensed Massage Therapists"],
    socialMedia: {
      instagram: "@elitefitnesswellness",
      facebook: "EliteFitnessWellness"
    },
    fullAddress: "654 Business Boulevard, West End",
    landmarks: ["Business District Plaza"],
    parking: {
      available: true,
      type: "Private parking garage",
      cost: "Free for members"
    },
    publicTransit: ["Metro Green Line"],
    policies: {
      cancellation: "12-hour cancellation policy required.",
      lateArrival: "Please arrive 15 minutes early.",
      payment: ["Cash", "Credit/Debit Cards", "Membership packages"],
      agePolicy: "Ages 16+ with guardian consent under 18"
    },
    safetyMeasures: [
      "Equipment sanitization",
      "Health screening",
      "Professional supervision"
    ],
    reviewsData: [
      {
        id: 1,
        name: "Alex P.",
        rating: 5,
        date: "2 days ago",
        verified: true,
        service: "Personal Training",
        text: "Amazing trainers and great results! Lost 20 lbs in 3 months with their program.",
        helpful: 15
      }
    ],
    reviewBreakdown: {
      5: 245,
      4: 45,
      3: 15,
      2: 5,
      1: 2
    },
    todaySlots: ["6:00 PM", "7:30 PM"],
    nextSlot: "6:00 PM",
    urgencyMessage: "2 spots left today",
    minPrice: 120,
    maxPrice: 250,
    services: ["Personal Training", "Massage", "Nutrition", "Recovery"],
    availability: "Available today",
    isVerified: true,
    isPopular: true,
    favorite: true,
    badges: ["Verified", "Top Rated", "Quick Response"],
    profileCompletion: 98,
    trustSignals: ["Responds within 15 minutes", "Booked 31 times this week", "Top rated"]
  },
  {
    id: 6,
    name: "The Beauty Bar",
    category: "Beauty Salon",
    tagline: "Your beauty destination",
    rating: 4.9,
    reviews: 278,
    location: "City Center",
    neighborhood: "Shopping District",
    distance: "0.6 miles",
    driveTime: "4 min drive",
    walkTime: "8 min walk",
    phone: "(555) 678-9012",
    email: "hello@thebeautybar.com",
    website: "www.thebeautybar.com",
    established: 2016,
    description: "The Beauty Bar is your premier destination for makeup, eyebrow styling, lash extensions, and facial treatments. Perfect for special events or everyday beauty needs.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        type: "main",
        title: "The Beauty Bar",
        description: "Professional beauty services"
      }
    ],
    serviceCategories: [
      {
        name: "Beauty Services",
        description: "Makeup, lashes, and eyebrow services",
        services: [
          {
            name: "Special Event Makeup",
            duration: "90 min",
            price: 95,
            popular: true,
            description: "Professional makeup for special occasions",
            image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            benefits: ["Professional application", "Long-lasting", "Photo ready"]
          }
        ]
      }
    ],
    packages: [],
    hours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    stats: {
      responseTime: "Usually within 30 minutes",
      ranking: "Top beauty salon in Shopping District",
      bookedThisWeek: 22,
      bookedThisMonth: 134,
      repeatCustomers: "89%",
      establishedYear: 2016
    },
    specialties: ["Event Makeup", "Lash Extensions", "Eyebrow Styling"],
    certifications: ["Certified Makeup Artists", "Lash Extension Certified"],
    socialMedia: {
      instagram: "@thebeautybar",
      facebook: "TheBeautyBar"
    },
    fullAddress: "987 Shopping Center Drive, City Center",
    landmarks: ["Shopping District Mall"],
    parking: {
      available: true,
      type: "Mall parking",
      cost: "Free for 3 hours"
    },
    publicTransit: ["Multiple bus lines", "Metro station nearby"],
    policies: {
      cancellation: "24-hour cancellation policy required.",
      lateArrival: "Please arrive 10 minutes early.",
      payment: ["Cash", "Credit/Debit Cards", "Gift cards"],
      agePolicy: "All ages welcome"
    },
    safetyMeasures: [
      "Sanitized tools and brushes",
      "Fresh applicators for each client"
    ],
    reviewsData: [
      {
        id: 1,
        name: "Sophia R.",
        rating: 5,
        date: "4 days ago",
        verified: true,
        service: "Event Makeup",
        text: "Perfect makeup for my wedding! The artist was so talented and professional.",
        helpful: 9
      }
    ],
    reviewBreakdown: {
      5: 234,
      4: 32,
      3: 8,
      2: 3,
      1: 1
    },
    todaySlots: ["1:15 PM", "3:00 PM", "5:45 PM"],
    nextSlot: "1:15 PM",
    urgencyMessage: "3 spots left today",
    minPrice: 75,
    maxPrice: 180,
    services: ["Makeup", "Eyebrows", "Lashes", "Facials"],
    availability: "Available today",
    isVerified: true,
    isPopular: true,
    favorite: false,
    badges: ["Verified", "Popular", "Event Specialist", "Near Me"],
    profileCompletion: 96,
    trustSignals: ["Event specialist", "Responds within 30 minutes", "Booked 22 times this week"]
  }
];

// Mock user data
export const mockUserData: UserData = {
  favoriteProviders: [1, 2, 5], // Bella's Spa, Mike's Barbershop, and Elite Fitness
  bookings: [
    {
      id: 1,
      providerId: 1,
      providerName: "Bella's Spa & Wellness",
      serviceName: "Signature Hydrating Facial",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "60 min",
      price: 85,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "Downtown",
      category: "Spa",
      created: "2024-01-10"
    },
    {
      id: 2,
      providerId: 6,
      providerName: "The Beauty Bar",
      serviceName: "Special Event Makeup",
      date: "2024-01-17",
      time: "6:00 PM",
      duration: "90 min",
      price: 95,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "City Center",
      category: "Beauty Salon",
      created: "2024-01-12"
    },
    {
      id: 3,
      providerId: 1,
      providerName: "Bella's Spa & Wellness",
      serviceName: "Hot Stone Therapy",
      date: "2024-01-05",
      time: "3:00 PM",
      duration: "90 min",
      price: 140,
      status: "completed",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "Downtown",
      category: "Spa",
      rating: 5,
      canRebook: true,
      created: "2024-01-01"
    },
    {
      id: 4,
      providerId: 2,
      providerName: "Mike's Modern Barbershop",
      serviceName: "Classic Haircut",
      date: "2023-12-28",
      time: "11:00 AM",
      duration: "45 min",
      price: 35,
      status: "completed",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "Midtown",
      category: "Barbershop",
      rating: 4,
      canRebook: true,
      created: "2023-12-25"
    },
    {
      id: 5,
      providerId: 3,
      providerName: "Sarah's Hair Studio",
      serviceName: "Full Color & Cut",
      date: "2023-12-20",
      time: "2:00 PM",
      duration: "3 hours",
      price: 150,
      status: "completed",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "Uptown",
      category: "Hair Salon",
      rating: 5,
      canRebook: true,
      created: "2023-12-18"
    }
  ],
  preferences: {
    location: "Downtown",
    maxDistance: 5,
    priceRange: [30, 200],
    categories: ["Spa", "Hair Salon", "Barbershop"]
  }
};

// Helper functions
export const getProviderById = (id: number): Provider | undefined => {
  return mockProviders.find(provider => provider.id === id);
};

export const getFavoriteProviders = (): Provider[] => {
  return mockProviders.filter(provider => 
    mockUserData.favoriteProviders.includes(provider.id)
  );
};

export const getUpcomingBookings = (): Booking[] => {
  return mockUserData.bookings.filter(booking => booking.status === 'upcoming');
};

export const getRecentBookings = (): Booking[] => {
  return mockUserData.bookings
    .filter(booking => booking.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
};

export const getPopularProviders = (): Provider[] => {
  return mockProviders.filter(provider => provider.isPopular);
};

export const getAllProviders = (): Provider[] => {
  return mockProviders;
};

export const toggleFavorite = (providerId: number): void => {
  const index = mockUserData.favoriteProviders.indexOf(providerId);
  if (index > -1) {
    mockUserData.favoriteProviders.splice(index, 1);
  } else {
    mockUserData.favoriteProviders.push(providerId);
  }
  
  // Update provider favorite status
  const provider = mockProviders.find(p => p.id === providerId);
  if (provider) {
    provider.favorite = !provider.favorite;
  }
};

export const createBooking = (bookingData: {
  providerId: number;
  serviceName: string;
  date: string;
  time: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
  price: number;
}): Booking => {
  const provider = getProviderById(bookingData.providerId);
  const service = provider?.serviceCategories.flatMap(cat => cat.services).find(s => s.name === bookingData.serviceName);
  
  const newBooking: Booking = {
    id: Date.now(),
    providerId: bookingData.providerId,
    providerName: provider?.name || "Unknown Provider",
    serviceName: bookingData.serviceName,
    date: bookingData.date,
    time: bookingData.time,
    duration: service?.duration || "60 min",
    price: bookingData.price,
    status: "upcoming",
    location: provider?.location || "Unknown",
    category: provider?.category || "Unknown",
    image: service?.image || provider?.images[0]?.url || "",
    rating: undefined,
    canRebook: false,
    created: new Date().toISOString().split('T')[0]
  };
  
  // Add to user's bookings
  mockUserData.bookings.push(newBooking);
  
  return newBooking;
};

// Staff-specific interfaces and data
export interface StaffAppointment {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  created: string;
  customerImage: string;
}

export interface StaffStats {
  todayAppointments: number;
  weekAppointments: number;
  monthAppointments: number;
  todayEarnings: number;
  weekEarnings: number;
  monthEarnings: number;
  totalClients: number;
  repeatClients: number;
  averageRating: number;
  totalReviews: number;
  completionRate: number;
}

export interface StaffSchedule {
  dayOfWeek: string;
  isOpen: boolean;
  startTime: string;
  endTime: string;
  breaks: {
    startTime: string;
    endTime: string;
  }[];
}

// Mock staff appointments (for the logged-in provider)
export const mockStaffAppointments: StaffAppointment[] = [
  {
    id: 1,
    customerName: "Sarah Mitchell",
    customerEmail: "sarah.m@email.com",
    customerPhone: "(555) 111-2222",
    serviceName: "Signature Hydrating Facial",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "60 min",
    price: 85,
    status: "upcoming",
    notes: "First time client, prefers gentle products",
    created: "2024-01-10",
    customerImage: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    customerName: "Emily Rodriguez",
    customerEmail: "emily.r@email.com",
    customerPhone: "(555) 222-3333",
    serviceName: "Swedish Relaxation Massage",
    date: "2024-01-15",
    time: "4:00 PM",
    duration: "90 min",
    price: 120,
    status: "upcoming",
    notes: "Regular client, prefers medium pressure",
    created: "2024-01-12",
    customerImage: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    customerName: "David Chen",
    customerEmail: "david.c@email.com",
    customerPhone: "(555) 333-4444",
    serviceName: "Hot Stone Therapy",
    date: "2024-01-16",
    time: "10:00 AM",
    duration: "90 min",
    price: 140,
    status: "upcoming",
    created: "2024-01-13",
    customerImage: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 4,
    customerName: "Jessica Thompson",
    customerEmail: "jess.t@email.com",
    customerPhone: "(555) 444-5555",
    serviceName: "Anti-Aging Treatment",
    date: "2024-01-16",
    time: "2:30 PM",
    duration: "75 min",
    price: 125,
    status: "upcoming",
    created: "2024-01-14",
    customerImage: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 5,
    customerName: "Michael Brown",
    customerEmail: "m.brown@email.com",
    customerPhone: "(555) 555-6666",
    serviceName: "Signature Hydrating Facial",
    date: "2024-01-17",
    time: "11:00 AM",
    duration: "60 min",
    price: 85,
    status: "upcoming",
    created: "2024-01-15",
    customerImage: "https://i.pravatar.cc/150?img=15"
  },
  {
    id: 6,
    customerName: "Amanda Wilson",
    customerEmail: "amanda.w@email.com",
    customerPhone: "(555) 666-7777",
    serviceName: "Swedish Relaxation Massage",
    date: "2024-01-12",
    time: "3:00 PM",
    duration: "90 min",
    price: 120,
    status: "completed",
    notes: "Excellent session, client very satisfied",
    created: "2024-01-08",
    customerImage: "https://i.pravatar.cc/150?img=25"
  },
  {
    id: 7,
    customerName: "Robert Martinez",
    customerEmail: "rob.m@email.com",
    customerPhone: "(555) 777-8888",
    serviceName: "Hot Stone Therapy",
    date: "2024-01-11",
    time: "1:00 PM",
    duration: "90 min",
    price: 140,
    status: "completed",
    created: "2024-01-05",
    customerImage: "https://i.pravatar.cc/150?img=33"
  },
  {
    id: 8,
    customerName: "Lisa Anderson",
    customerEmail: "lisa.a@email.com",
    customerPhone: "(555) 888-9999",
    serviceName: "Signature Hydrating Facial",
    date: "2024-01-10",
    time: "4:30 PM",
    duration: "60 min",
    price: 85,
    status: "completed",
    created: "2024-01-07",
    customerImage: "https://i.pravatar.cc/150?img=20"
  },
  {
    id: 9,
    customerName: "James Taylor",
    customerEmail: "james.t@email.com",
    customerPhone: "(555) 999-0000",
    serviceName: "Anti-Aging Treatment",
    date: "2024-01-09",
    time: "11:30 AM",
    duration: "75 min",
    price: 125,
    status: "completed",
    created: "2024-01-04",
    customerImage: "https://i.pravatar.cc/150?img=52"
  },
  {
    id: 10,
    customerName: "Karen White",
    customerEmail: "karen.w@email.com",
    customerPhone: "(555) 000-1111",
    serviceName: "Swedish Relaxation Massage",
    date: "2024-01-08",
    time: "2:00 PM",
    duration: "90 min",
    price: 120,
    status: "no-show",
    notes: "Client did not show up, no cancellation notice",
    created: "2024-01-03",
    customerImage: "https://i.pravatar.cc/150?img=45"
  }
];

// Mock staff schedule
export const mockStaffSchedule: StaffSchedule[] = [
  {
    dayOfWeek: "Monday",
    isOpen: true,
    startTime: "9:00 AM",
    endTime: "8:00 PM",
    breaks: [{ startTime: "12:00 PM", endTime: "1:00 PM" }]
  },
  {
    dayOfWeek: "Tuesday",
    isOpen: true,
    startTime: "9:00 AM",
    endTime: "8:00 PM",
    breaks: [{ startTime: "12:00 PM", endTime: "1:00 PM" }]
  },
  {
    dayOfWeek: "Wednesday",
    isOpen: true,
    startTime: "9:00 AM",
    endTime: "8:00 PM",
    breaks: [{ startTime: "12:00 PM", endTime: "1:00 PM" }]
  },
  {
    dayOfWeek: "Thursday",
    isOpen: true,
    startTime: "9:00 AM",
    endTime: "8:00 PM",
    breaks: [{ startTime: "12:00 PM", endTime: "1:00 PM" }]
  },
  {
    dayOfWeek: "Friday",
    isOpen: true,
    startTime: "9:00 AM",
    endTime: "9:00 PM",
    breaks: [{ startTime: "12:00 PM", endTime: "1:00 PM" }]
  },
  {
    dayOfWeek: "Saturday",
    isOpen: true,
    startTime: "8:00 AM",
    endTime: "9:00 PM",
    breaks: [{ startTime: "12:00 PM", endTime: "1:00 PM" }]
  },
  {
    dayOfWeek: "Sunday",
    isOpen: true,
    startTime: "10:00 AM",
    endTime: "6:00 PM",
    breaks: []
  }
];

// Staff helper functions
export const getStaffTodayAppointments = (): StaffAppointment[] => {
  const today = new Date().toISOString().split('T')[0];
  return mockStaffAppointments.filter(apt => 
    apt.date === today && apt.status === 'upcoming'
  );
};

export const getStaffUpcomingAppointments = (): StaffAppointment[] => {
  const today = new Date();
  return mockStaffAppointments
    .filter(apt => new Date(apt.date) >= today && apt.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getStaffCompletedAppointments = (): StaffAppointment[] => {
  return mockStaffAppointments
    .filter(apt => apt.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getStaffStats = (): StaffStats => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 7);
  const monthStart = new Date(today);
  monthStart.setDate(today.getDate() - 30);

  const todayApts = mockStaffAppointments.filter(apt => apt.date === todayStr);
  const weekApts = mockStaffAppointments.filter(apt => new Date(apt.date) >= weekStart);
  const monthApts = mockStaffAppointments.filter(apt => new Date(apt.date) >= monthStart);

  const todayEarnings = todayApts.reduce((sum, apt) => sum + (apt.status === 'completed' ? apt.price : 0), 0);
  const weekEarnings = weekApts.reduce((sum, apt) => sum + (apt.status === 'completed' ? apt.price : 0), 0);
  const monthEarnings = monthApts.reduce((sum, apt) => sum + (apt.status === 'completed' ? apt.price : 0), 0);

  const uniqueClients = new Set(mockStaffAppointments.map(apt => apt.customerEmail));
  const clientAppointmentCounts = new Map<string, number>();
  mockStaffAppointments.forEach(apt => {
    clientAppointmentCounts.set(apt.customerEmail, (clientAppointmentCounts.get(apt.customerEmail) || 0) + 1);
  });
  const repeatClients = Array.from(clientAppointmentCounts.values()).filter(count => count > 1).length;

  const completedCount = mockStaffAppointments.filter(apt => apt.status === 'completed').length;
  const totalCount = mockStaffAppointments.length;

  return {
    todayAppointments: todayApts.length,
    weekAppointments: weekApts.length,
    monthAppointments: monthApts.length,
    todayEarnings,
    weekEarnings,
    monthEarnings,
    totalClients: uniqueClients.size,
    repeatClients,
    averageRating: 4.9,
    totalReviews: 245,
    completionRate: Math.round((completedCount / totalCount) * 100)
  };
};

export const getStaffSchedule = (): StaffSchedule[] => {
  return mockStaffSchedule;
};

export const updateAppointmentStatus = (appointmentId: number, newStatus: StaffAppointment['status']): void => {
  const appointment = mockStaffAppointments.find(apt => apt.id === appointmentId);
  if (appointment) {
    appointment.status = newStatus;
  }
};