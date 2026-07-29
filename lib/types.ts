import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export type IPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

export type IAuthor = {
  id: string
  name: string
  email: string
  activeStatus: string
  role: string
  createdAt: string
  updatedAt: string
}

export type IComment = {
  id: string
  content: string
  status: string
  postId: string
  authorId: string
  createdAt: string
  updatedAt: string
}

export type IPost = {
  id: string
  title: string
  content: string
  thumbnail: string | null
  isFeatured: boolean
  status: IPostStatus
  tags: string[]
  views: number
  isPremium: boolean
  authorId: string
  author?: IAuthor
  comments?: IComment[]
  _count?: {
    comments: number
  }
  createdAt: string
  updatedAt: string
}

type IUser = {
  success: boolean
  message: string
  data: {
    user: {
      id: string
      name: string
      email: string
      activeStatus: string
      role: string
      createdAt: string
      updatedAt: string
    }
  }
}

export type NavbarProps = {
  user: IUser
}

export type ISidebarItem = {
  label: string
  href: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
}

export interface RentalTenant {
  id: string
  name: string
  email: string
  phone: string
}

export interface RentalPropertyCategory {
  id: string
  name: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface RentalProperty {
  id: string
  landlordId: string
  categoryId: string
  title: string
  description?: string
  address: string
  city: string
  price: string
  bedrooms: number
  bathrooms: number
  status: "AVAILABLE" | "RENTED" | "PENDING"
  createdAt: string
  updatedAt: string
  category: RentalPropertyCategory
}

export interface RentalPayment {
  id: string
  rentalRequestId: string
  transactionId: string
  amount: number
  provider: string
  status: "SUCCESS" | "FAILED" | "PENDING"
  paidAt: string
  createdAt: string
  updatedAt: string
}

export interface RentalRequest {
  id: string
  propertyId: string
  tenantId: string
  status: "PENDING" | "ACTIVE" | "REJECTED" | "COMPLETED"
  startDate: string | null
  endDate: string | null
  totalPrice: number | null
  createdAt: string
  updatedAt: string
  tenant: RentalTenant
  property: RentalProperty
  payment: RentalPayment | null
}

export interface GetLandlordRentalRequestsResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: RentalRequest[]
}

export interface MyProperty {
  id: string
  landlordId: string
  categoryId: string
  title: string
  description?: string
  address: string
  city: string
  price: string
  bedrooms: number
  bathrooms: number
  status: "AVAILABLE" | "RENTED" | "PENDING"
  createdAt: string
  updatedAt: string
}

export interface GetMyPropertiesResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: {
    properties: MyProperty[]
  }
}

export interface DeletePropertyResponse {
  success: boolean
  statusCode?: number
  message?: string
}

export interface MyRentalRequestProperty {
  id: string
  landlordId: string
  categoryId: string
  title: string
  description: string
  address: string
  city: string
  price: string
  bedrooms: number
  bathrooms: number
  status: string
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    createdBy: string
    createdAt: string
    updatedAt: string
  }
  landlord: {
    id: string
    name: string
    email: string
    phone: string
  }
}

export interface MyRentalRequest {
  id: string
  propertyId: string
  tenantId: string
  status: "PENDING" | "APPROVED" | "ACTIVE" | "REJECTED" | "COMPLETED"
  startDate: string | null
  endDate: string | null
  totalPrice: number | null
  createdAt: string
  updatedAt: string
  property: MyRentalRequestProperty
  payment?: {
    status: "PENDING" | "SUCCESS" | "FAILED"
    provider: string
    paidAt: string | null
  } | null
}

export interface GetMyRentalRequestsResponse {
  success: boolean
  statusCode?: number
  message: string
  data?: MyRentalRequest[]
}

export interface CreatePaymentResponse {
  success: boolean
  statusCode?: number
  message: string
  data?: {
    checkoutUrl: string
  }
}
