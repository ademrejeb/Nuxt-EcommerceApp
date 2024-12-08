class TaxDetails {
    constructor({ withTax = false, taxLabel = '', taxValue = 0.0 } = {}) {
        this.withTax = withTax;
        this.taxLabel = taxLabel;
        this.taxValue = taxValue;
    }
}

class DeliveryDetails {
    constructor({
        dimensionUnit = '',
        weightUnit = '',
        weight = 0.0,
        width = 0.0,
        height = 0.0,
        depth = 0.0
    } = {}) {
        this.dimensionUnit = dimensionUnit;
        this.weightUnit = weightUnit;
        this.weight = weight;
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
}

class ProductOptionValue {
    constructor({ label = '', price = 0.0, picture = '' } = {}) {
        this.label = label;
        this.price = price;
        this.picture = picture;
    }
}

class ProductOption {
    constructor({
        name = '',
        description = '',
        required = false,
        nature = '',
        limit = 0,
        order = 0,
        values = []
    } = {}) {
        this.name = name;
        this.description = description;
        this.required = required;
        this.nature = nature;
        this.limit = limit;
        this.order = order;
        this.values = values.map(value => new ProductOptionValue(value));
    }
}

class ProductAttribute {
    constructor({
        externalId = '',
        name = '',
        values = [],
        groups = [],
        type = '',
        unit = ''
    } = {}) {
        this.externalId = externalId;
        this.name = name;
        this.values = values;
        this.groups = groups;
        this.type = type;
        this.unit = unit;
    }
}

class Product {
    constructor({
        externalId = '',
        id = null,
        name = '',
        description = '',
        seoMetadata = {},
        cover = '',
        tags = [],
        options = [],
        attributsInfo = [],
        variants = [],
        pictures = [],
        videos = [],
        price = 0.0,
        priceBeforeDiscount = 0.0,
        priceBeforeTax = 0.0,
        taxDetails = {},
        deliveryDetails = {},
        sku = '',
        status = '',
        collections = [],
        collectionsInfo = [],
        categories = [],
        categoriesInfo = [],
        supplier = '',
        supplierInfo = null,
        brand = '',
        brandInfo = null,
        typeProduct = '',
        storeId = '',
        sellerId = '',
        availability = false,
        quantity = 0,
        disposition = 0,
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.externalId = externalId;
        this.id = id;
        this.name = name;
        this.description = description;
        this.seoMetadata = seoMetadata;
        this.cover = cover;
        this.tags = tags;
        this.options = options.map(option => new ProductOption(option));
        this.attributsInfo = attributsInfo.map(attr => new ProductAttribute(attr));
        this.variants = variants; // Assuming it's an array of InventoryOption objects
        this.pictures = pictures;
        this.videos = videos;
        this.price = price;
        this.priceBeforeDiscount = priceBeforeDiscount;
        this.priceBeforeTax = priceBeforeTax;
        this.taxDetails = new TaxDetails(taxDetails);
        this.deliveryDetails = new DeliveryDetails(deliveryDetails);
        this.sku = sku;
        this.status = status;
        this.collections = collections;
        this.collectionsInfo = collectionsInfo; // Assuming it's an array of Collection objects
        this.categories = categories;
        this.categoriesInfo = categoriesInfo; // Assuming it's an array of ProductCategory objects
        this.supplier = supplier;
        this.supplierInfo = supplierInfo; // Assuming it's a Supplier object
        this.brand = brand;
        this.brandInfo = brandInfo; // Assuming it's a Brand object
        this.typeProduct = typeProduct;
        this.storeId = storeId;
        this.sellerId = sellerId;
        this.availability = availability;
        this.quantity = quantity;
        this.disposition = disposition;
        this.createdAt = createdAt ? new Date(createdAt) : null;
        this.updatedAt = updatedAt ? new Date(updatedAt) : null;
    }
}

class ProductUpsert extends Product {
    constructor(props) {
        super(props);
    }
}

class SearchQueryProduct {
    constructor({
        name = '',
        storeExternalId = '',
        collectionExternalId = '',
        categoryExternalId = '',
        supplierExternalId = '',
        brandExternalId = '',
        externalId = '',
        status = '',
        page = '',
        size = '',
        sort = false,
        sellerId = '',
        sellerCollectionExternalId = '',
        reservable = false,
        allTypeReservable = false
    } = {}) {
        this.name = name;
        this.storeExternalId = storeExternalId;
        this.collectionExternalId = collectionExternalId;
        this.categoryExternalId = categoryExternalId;
        this.supplierExternalId = supplierExternalId;
        this.brandExternalId = brandExternalId;
        this.externalId = externalId;
        this.status = status;
        this.page = page;
        this.size = size;
        this.sort = sort;
        this.sellerId = sellerId;
        this.sellerCollectionExternalId = sellerCollectionExternalId;
        this.reservable = reservable;
        this.allTypeReservable = allTypeReservable;
    }
}

class PaginatedProduct {
    constructor({
        products = [],
        page = 0,
        totalPerPage = 0,
        total = 0,
        totalPages = 0
    } = {}) {
        this.products = products.map(product => new Product(product));
        this.page = page;
        this.totalPerPage = totalPerPage;
        this.total = total;
        this.totalPages = totalPages;
    }
}
