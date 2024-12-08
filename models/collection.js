// SeoMetadata Class
class SeoMetadata {
    constructor({ title = '', description = '', slug = '' } = {}) {
        this.title = title;
        this.description = description;
        this.slug = slug;
    }
}

// Collection Class
class Collection {
    constructor({
        externalId = '',
        sellerId = '',
        id = null,
        name = '',
        cover = '',
        description = '',
        seoMetadata = {},
        parentExternalId = '',
        parentCollectionName = '',
        children = [],
        category = '',
        isPro = false,
        status = false,
        order = 0,
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.externalId = externalId;
        this.sellerId = sellerId;
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.description = description;
        this.seoMetadata = new SeoMetadata(seoMetadata);
        this.parentExternalId = parentExternalId;
        this.parentCollectionName = parentCollectionName;
        this.children = children.map(child => new Collection(child));
        this.category = category;
        this.isPro = isPro;
        this.status = status;
        this.order = order;
        this.createdAt = createdAt ? new Date(createdAt) : null;
        this.updatedAt = updatedAt ? new Date(updatedAt) : null;
    }
}

// CollectionRequest Class
class CollectionRequest extends Collection {
    constructor(props = {}) {
        super(props);
    }
}

// IndexedCollection Class
class IndexedCollection {
    constructor({ name = '', externalId = '' } = {}) {
        this.name = name;
        this.externalId = externalId;
    }
}

// CollectionUpsert Class
class CollectionUpsert extends Collection {
    constructor(props = {}) {
        super(props);
    }
}

// CollectionUpdateRequest Class
class CollectionUpdateRequest {
    constructor({ collection = {}, updateMasks = [] } = {}) {
        this.collection = new CollectionUpsert(collection);
        this.updateMasks = updateMasks;
    }
}

// SearchQueryCollection Class
class SearchQueryCollection {
    constructor({
        name = '',
        sellerId = '',
        page = '',
        pagination = '',
        size = '',
        parentExternalId = '',
        view = '',
        storeExternalId = '',
        category = '',
        isPro = false,
        all = false
    } = {}) {
        this.name = name;
        this.sellerId = sellerId;
        this.page = page;
        this.pagination = pagination;
        this.size = size;
        this.parentExternalId = parentExternalId;
        this.view = view;
        this.storeExternalId = storeExternalId;
        this.category = category;
        this.isPro = isPro;
        this.all = all;
    }
}

// PaginatedCollection Class
class PaginatedCollection {
    constructor({
        collections = [],
        page = 0,
        totalPerPage = 0,
        total = 0,
        totalPages = 0
    } = {}) {
        this.collections = collections.map(collection => new Collection(collection));
        this.page = page;
        this.totalPerPage = totalPerPage;
        this.total = total;
        this.totalPages = totalPages;
    }
}

// Export Classes
module.exports = {
    SeoMetadata,
    Collection,
    CollectionRequest,
    IndexedCollection,
    CollectionUpsert,
    CollectionUpdateRequest,
    SearchQueryCollection,
    PaginatedCollection
};
