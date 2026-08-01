import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons"

export type UserStatus = "ACTIVE" | "BANNED"
export type RentalStatusAction = "APPROVED" | "REJECTED"

export type ISidebarItem = {
  label: string
  href: string
  icon: LucideIcon | IconType
}

// ---------- Shared base entities ----------

export interface Category {
  id: string
  name: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface PersonSummary {
  id: string
  name: string
  email: string
  phone?: string
}

// Base property shape — every "property" variant below is built from this
export interface BaseProperty {
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

export interface PropertyWithCategory extends BaseProperty {
  category: Category
}

export interface PropertyWithLandlord extends PropertyWithCategory {
  landlord: PersonSummary
}

// ---------- Rental requests ----------

export interface BaseRentalRequest {
  id: string
  propertyId: string
  tenantId: string
  startDate: string | null
  endDate: string | null
  totalPrice: number | null
  createdAt: string
  updatedAt: string
}

// Tenant-side view: request has full property+landlord info, minimal payment info
export interface MyRentalRequest extends BaseRentalRequest {
  status: "PENDING" | "APPROVED" | "ACTIVE" | "REJECTED" | "COMPLETED"
  property: PropertyWithLandlord
  payment?: {
    status: "PENDING" | "SUCCESS" | "FAILED"
    provider: string
    paidAt: string | null
  } | null
}

// Landlord-side view: request has tenant info + full property, full payment record
export interface RentalRequest extends BaseRentalRequest {
  status: "PENDING" | "ACTIVE" | "REJECTED" | "COMPLETED"
  tenant: PersonSummary
  property: PropertyWithCategory
  payment: Payment | null
}

export interface GetLandlordRentalRequestsResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: RentalRequest[]
}

export interface GetMyRentalRequestsResponse {
  success: boolean
  statusCode?: number
  message: string
  data?: MyRentalRequest[]
}

// ---------- Properties (landlord's own listings) ----------

export type MyProperty = BaseProperty

export interface GetMyPropertiesResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: { properties: MyProperty[] }
}

export interface DeletePropertyResponse {
  success: boolean
  statusCode?: number
  message?: string
}

export interface CreatePropertyPayload {
  categoryId: string
  title: string
  description: string
  address: string
  city: string
  price: string
  bedrooms: number
  bathrooms: number
  status: "AVAILABLE" | "RENTED" | "PENDING"
}

export interface CreatePropertyResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: { id: string }
}

export interface UpdatePropertyResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: { id: string }
}

// ---------- Payments ----------

export interface Payment {
  id: string
  rentalRequestId: string
  transactionId: string
  amount: number
  provider: string
  status: "SUCCESS" | "PENDING" | "FAILED"
  paidAt: string | null
  createdAt: string
  updatedAt: string
  rentalRequest: BaseRentalRequest & {
    status: "PENDING" | "APPROVED" | "ACTIVE" | "REJECTED" | "COMPLETED"
    property: BaseProperty
  }
}

export interface GetMyPaymentsResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: Payment[]
}

export interface CreatePaymentResponse {
  success: boolean
  statusCode?: number
  message: string
  data?: { checkoutUrl: string }
}

// ---------- Categories ----------

export interface GetCategoryResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: { categories: Category[] }
}

export interface CategoryResponse {
  success: boolean
  statusCode?: number
  message: string
  data?: { category?: Category; categories?: Category[] }
}

// ---------- Reviews ----------

export interface Review {
  id: string
  propertyId: string
  tenantId: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
  tenant: Pick<PersonSummary, "id" | "name" | "email">
  property: Pick<BaseProperty, "id" | "title">
}

export interface GetReviewsResponse {
  success: boolean
  statusCode: number
  message: string
  data: Review[]
}
