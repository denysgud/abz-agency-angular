export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  photo: string;
}

export class UsersObj {
  sucess: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: object;
  users: User[];
}

export class UserObj {
  sucess: boolean;
  user: User;
}
/* export class Movie { 
  
  public constructor( 
        private _movie_id:number, 
        private _title: string, 
        private _phase: string, 
        private _category_name: string, 
        private _release_year: number, 
        private _running_time: number, 
        private _rating_name: string, 
        private _disc_format_name: string, 
        private _number_discs: number, 
        private _viewing_format_name: string, 
        private _aspect_ratio_name: string, 
        private _status: string, 
        private _release_date: string, 
        private _budget: number, 
        private _gross: number, 
        private _time_stamp:Date){ 
  } 
 
  public toString = () : string => { 
 
        return `Movie (movie_id: ${this._movie_id}, 
        title: ${this._title}, 
        phase: ${this._phase}, 
        category_name: ${this._category_name}, 
        release_year: ${this._release_year}, 
        running_time: ${this._running_time}, 
        rating_name: ${this._rating_name}, 
        disc_format_name: ${this._disc_format_name}, 
         number_discs: ${this._number_discs}, 
        viewing_format_name: ${this._viewing_format_name}, 
        aspect_ratio_name: ${this._aspect_ratio_name}, 
        status: ${this._status}, 
        release_date: ${this._release_date}, 
        budget: ${this._budget}, 
        gross: ${this._gross}, 
        time_stamp: ${this._time_stamp})`; 
 
  } 
  //GETTER 
  //SETTER 
} 
 
export enum MovieFields{ 
  movie_id, 
  title, 
  phase, 
  category_name, 
  release_year, 
  running_time, 
  rating_name, 
  disc_format_name, 
  number_discs, 
  viewing_format_name, 
  aspect_ratio_name, 
  status, 
  release_date, 
  budget, 
  gross, 
  time_stamp 
}  */