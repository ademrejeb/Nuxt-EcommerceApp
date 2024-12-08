// SeoMetadata Class
class SeoMetadata {
    constructor({ title = '', description = '', slug = '' } = {}) {
        this.title = title;
        this.description = description;
        this.slug = slug;
    }
}

// ProductCategory Class
class ProductCategory {
    constructor({
        id = null,
        externalId = '',
        sellerId = '',
        name = '',
        language = '',
        category = '',
        description = '',
        cover = '',
        parentExternalId = '',
        parentCategoryName = '',
        children = [],
        backgroundColor = '',
        foregroundColor = '',
        seoMetadata = {},
        order = 0,
        status = false,
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.id = id;
        this.externalId = externalId;
        this.sellerId = sellerId;
        this.name = name;
        this.language = language;
        this.category = category;
        this.description = description;
        this.cover = cover;
        this.parentExternalId = parentExternalId;
        this.parentCategoryName = parentCategoryName;
        this.children = children.map(child => new ProductCategory(child));
        this.backgroundColor = backgroundColor;
        this.foregroundColor = foregroundColor;
        this.seoMetadata = new SeoMetadata(seoMetadata);
        this.order = order;
        this.status = status;
        this.createdAt = createdAt ? new Date(createdAt) : null;
        this.updatedAt = updatedAt ? new Date(updatedAt) : null;
    }
}

// Category Class
class Category extends ProductCategory {}

// CategoryRequest Class
class CategoryRequest {
    constructor({
        name = '',
        language = '',
        category = '',
        cover = '',
        parentExternalId = '',
        description = '',
        backgroundColor = '',
        foregroundColor = '',
        seoMetadata = {},
        order = 0,
        status = false
    } = {}) {
        this.name = name;
        this.language = language;
        this.category = category;
        this.cover = cover;
        this.parentExternalId = parentExternalId;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.foregroundColor = foregroundColor;
        this.seoMetadata = new SeoMetadata(seoMetadata);
        this.order = order;
        this.status = status;
    }
}

// CategoryUpdateRequest Class
class CategoryUpdateRequest {
    constructor({ category = {}, updateMask = [] } = {}) {
        this.category = new Category(category);
        this.updateMask = updateMask;
    }
}

// SearchCategory Class
class SearchCategory {
    constructor({
        name = '',
        sellerId = '',
        parentExternalId = '',
        language = '',
        category = '',
        pagination = '',
        page = '',
        size = '',
        externalId = '',
        view = '',
        all = false
    } = {}) {
        this.name = name;
        this.sellerId = sellerId;
        this.parentExternalId = parentExternalId;
        this.language = language;
        this.category = category;
        this.pagination = pagination;
        this.page = page;
        this.size = size;
        this.externalId = externalId;
        this.view = view;
        this.all = all;
    }
}

// PaginatedCategory Class
class PaginatedCategory {
    constructor({
        categories = [],
        productCategories = [],
        totalPerPage = 0,
        totalPages = 0,
        page = 0,
        total = 0
    } = {}) {
        this.categories = categories.map(category => new Category(category));
        this.productCategories = productCategories.map(
            productCategory => new ProductCategory(productCategory)
        );
        this.totalPerPage = totalPerPage;
        this.totalPages = totalPages;
        this.page = page;
        this.total = total;
    }
}

// CategoryUpsert Class
class CategoryUpsert extends ProductCategory {
    constructor(props = {}) {
        super(props);
    }
}

// Export Classes
module.exports = {
    SeoMetadata,
    ProductCategory,
    Category,
    CategoryRequest,
    CategoryUpdateRequest,
    SearchCategory,
    PaginatedCategory,
    CategoryUpsert
};
