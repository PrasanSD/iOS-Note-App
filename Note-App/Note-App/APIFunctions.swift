//
//  APIFunctions.swift
//  Note-App
//
//  Created by Prasan Dhareshwar on 1/12/21.
//

import Foundation
import Alamofire

struct Note: Decodable {
    var title: String
    var date: String
    var _id: String
    var note: String
}

class APIFunctions {
    
    var delegate: DataDelegate?
    
    static let functions = APIFunctions()
    
    //change localhost to the ip address
    
    func fetchNotes() {
        AF.request("localhost:8081/fetch").response { response in
            let data = String(data: response.data!, encoding: .utf8)
            
            self.delegate?.updateArray(newArray: data!)
        }
    }
    
    func addNote(date: String, title: String, note: String) {
        AF.request("localhost:8081/create", method: .post, encoding: URLEncoding.httpBody, headers: ["title": title, "date": date, "note": note]).responseJSON { response in
            
        }
    }
    
    func updateNote(date: String, title: String, note: String, id: String) {
        AF.request("localhost:8081/update", method: .post, encoding: URLEncoding.httpBody, headers: ["title": title, "date": date, "note": note, "id": id]).responseJSON { response in
            
        }
    }
    
    func deleteNote(id: String) {
        AF.request("localhost:8081/delete", method: .post, encoding: URLEncoding.httpBody, headers: ["id": id]).responseJSON { response in
            
        }
    }
    
}
