




export interface AllProductList {
  message:  string;
  products: Product[];
}

export interface Product {
  _id:           string;
  name:          string;
  slug:          string;
  discription:   string;
  price:         number;
  discount:      number;
  finalPrice:    number;
  stock:         number;
  size:          string[];
  colors:        string[];
  mainImage:     Image;
  subImages:     Image[];
  categoryId:    string;
  brandId:       string;
  subCategoryId: string;
  isDeleted:     boolean;
  createdAt:     Date;
  updatedAt:     Date;
  __v:           number;
  review:        any[];
  brand:         Brand[];
  id:            string;
  avgRating:    number | null
}

export interface Brand {
  _id:  string;
  name: string;
}

export interface Image {
  secure_url: string;
  public_id:  string;
}
