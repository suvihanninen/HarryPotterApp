
    export interface Character {
        
        [key: string]: string | number | boolean | object;
        id: string;
        name: string;
        alternate_names: string[];
        species: string;
        gender: string;
        house: string;
        dateOfBirth: string;
        yearOfBirth: number;
        wizard: boolean;
        ancestry: string;
        eyeColour: string;
        hairColour: string;
        wand: {
          wood: string;
          core: string;
          length: number | null;
        };
        patronus: string;
        hogwartsStudent: boolean;
        hogwartsStaff: boolean;
        actor: string;
        alternate_actors: string[];
        alive: boolean;
        image: string;
      }
    

