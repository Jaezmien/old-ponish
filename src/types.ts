export interface DictionaryWord {
	definition: string;
	note?: string;
	speech?: string[];
	similar?: string[];
	nsfw?: DictionaryNSFW;
	character?: DictionaryCharacter;
}
export interface DictionaryNSFW {
	definition: string;
	in_universe: string;
	out_universe: string;
}
export interface DictionaryCharacter {
	english?: string;
	justification?: string;
}

export interface EtymologyWord {
	etymology: string;
	credit?: string;
	description?: string;
	note?: string;
}

export type ObjectType<T> = { [key: string]: T };
export type DictionaryType = ObjectType<DictionaryWord>;
export type EtymologyType = ObjectType<EtymologyWord>;
