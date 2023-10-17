export interface AllCat {
    message:  string;
    category: Category[];
}

export interface Category {
    _id:         string;
    name:        string;
    slug:        string;
    image:       Imag;
    createdBy:   string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
    subcategoty: Subcategoty[];
    id:          string;
}

export interface Imag {
    public_id:  string;
    secure_url: string;
}

export interface Subcategoty {
    _id:        string;
    name:       string;
    customId:   string;
    slug:       string;
    imag:       Imag;
    createdBy:  string;
    categoryId: string;
    createdAt:  Date;
    updatedAt:  Date;
    __v:        number;
}
