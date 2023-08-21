export interface SeriesDetails {
    code:            number;
    status:          string;
    copyright:       string;
    attributionText: string;
    attributionHTML: string;
    etag:            string;
    data:            Data;
}

export interface Data {
    offset:  number;
    limit:   number;
    total:   number;
    count:   number;
    results: Result[];
}

export interface Result {
    id:          number;
    title:       string;
    description: null;
    resourceURI: string;
    urls:        URL[];
    startYear:   number;
    endYear:     number;
    rating:      string;
    type:        string;
    modified:    string;
    thumbnail:   Thumbnail;
    creators:    Characters;
    characters:  Characters;
    stories:     Characters;
    comics:      Characters;
    events:      Characters;
    next:        null;
    previous:    null;
}

export interface Characters {
    available:     number;
    collectionURI: string;
    items:         Item[];
    returned:      number;
}

export interface Item {
    resourceURI: string;
    name:        string;
    role?:       string;
    type?:       Type;
}

export enum Type {
    Cover = "cover",
    InteriorStory = "interiorStory",
}

export interface Thumbnail {
    path:      string;
    extension: string;
}

export interface URL {
    type: string;
    url:  string;
}
