// Package.js

class Package {
    constructor({
        _id,
        external_id,
        seller_id,
        name,
        description,
        description_label,
        cover,
        pictures = [],
        videos = [],
        price_before_discount,
        final_price,
        status,
        seo_metadata,
        out_of_inventory_selling,
        tags = [],
        seller_collections = [],
        seller_collections_info = [],
        categories = [],
        categories_info = [],
        supplier,
        supplier_info,
        brand,
        brand_info,
        stores = [],
        tax_details,
        delivery_details,
        cost,
        sku,
        bar_code,
        package_products = [],
        options = [],
        options_label,
        attributs = [],
        attributes_label,
        sh_code,
        store_infos,
        constructor_country,
        created_at,
        updated_at
    } = {}) {
        this._id = _id;
        this.external_id = external_id;
        this.seller_id = seller_id;
        this.name = name;
        this.description = description;
        this.description_label = description_label;
        this.cover = cover;
        this.pictures = pictures;
        this.videos = videos;
        this.price_before_discount = price_before_discount;
        this.final_price = final_price;
        this.status = status;
        this.seo_metadata = seo_metadata;
        this.out_of_inventory_selling = out_of_inventory_selling;
        this.tags = tags;
        this.seller_collections = seller_collections;
        this.seller_collections_info = seller_collections_info;
        this.categories = categories;
        this.categories_info = categories_info;
        this.supplier = supplier;
        this.supplier_info = supplier_info;
        this.brand = brand;
        this.brand_info = brand_info;
        this.stores = stores;
        this.tax_details = tax_details;
        this.delivery_details = delivery_details;
        this.cost = cost;
        this.sku = sku;
        this.bar_code = bar_code;
        this.package_products = package_products;
        this.options = options;
        this.options_label = options_label;
        this.attributs = attributs;
        this.attributes_label = attributes_label;
        this.sh_code = sh_code;
        this.store_infos = store_infos;
        this.constructor_country = constructor_country;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

class PackageUpsert {
    constructor({
        name,
        seller_id,
        description,
        description_label,
        cover,
        pictures = [],
        videos = [],
        price_before_discount,
        final_price,
        status,
        seo_metadata,
        out_of_inventory_selling,
        tags = [],
        cost,
        sku,
        bar_code,
        package_products = [],
        tax_details,
        delivery_details,
        seller_collections = [],
        seller_collections_info = [],
        categories = [],
        categories_info = [],
        supplier,
        brand,
        brand_info,
        stores = [],
        store_infos,
        sh_code,
        options = [],
        options_label,
        attributs = [],
        attributes_label,
        constructor_country,
        created_at,
        updated_at
    } = {}) {
        this.name = name;
        this.seller_id = seller_id;
        this.description = description;
        this.description_label = description_label;
        this.cover = cover;
        this.pictures = pictures;
        this.videos = videos;
        this.price_before_discount = price_before_discount;
        this.final_price = final_price;
        this.status = status;
        this.seo_metadata = seo_metadata;
        this.out_of_inventory_selling = out_of_inventory_selling;
        this.tags = tags;
        this.cost = cost;
        this.sku = sku;
        this.bar_code = bar_code;
        this.package_products = package_products;
        this.tax_details = tax_details;
        this.delivery_details = delivery_details;
        this.seller_collections = seller_collections;
        this.seller_collections_info = seller_collections_info;
        this.categories = categories;
        this.categories_info = categories_info;
        this.supplier = supplier;
        this.brand = brand;
        this.brand_info = brand_info;
        this.stores = stores;
        this.store_infos = store_infos;
        this.sh_code = sh_code;
        this.options = options;
        this.options_label = options_label;
        this.attributs = attributs;
        this.attributes_label = attributes_label;
        this.constructor_country = constructor_country;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

class PackageProduct {
    constructor({ quantity, product_external_id, product_info } = {}) {
        this.quantity = quantity;
        this.product_external_id = product_external_id;
        this.product_info = product_info;
    }
}

class PackageUpdateRequest {
    constructor({ packageData, update_masks } = {}) {
        this.package = packageData;
        this.update_masks = update_masks;
    }
}

class SearchQueryPackage {
    constructor({
        store_external_id,
        seller_id,
        name,
        external_id,
        status,
        page,
        size,
        sort
    } = {}) {
        this.store_external_id = store_external_id;
        this.seller_id = seller_id;
        this.name = name;
        this.external_id = external_id;
        this.status = status;
        this.page = page;
        this.size = size;
        this.sort = sort;
    }
}

class PaginatedPackage {
    constructor({ packages, page, total_per_page, total, total_pages } = {}) {
        this.packages = packages;
        this.page = page;
        this.total_per_page = total_per_page;
        this.total = total;
        this.total_pages = total_pages;
    }
}

class ProductPackageInfo {
    constructor({ product_external_id, name, sku, cover } = {}) {
        this.product_external_id = product_external_id;
        this.name = name;
        this.sku = sku;
        this.cover = cover;
    }
}

module.exports = {
    Package,
    PackageUpsert,
    PackageProduct,
    PackageUpdateRequest,
    SearchQueryPackage,
    PaginatedPackage,
    ProductPackageInfo
};
