import json
import os

class DBHandler:
    def __init__(self, file):
        self.file = file
        if not os.path.exists(file):
            with open(file, "w") as f:
                json.dump([], f)

    def _read(self):
        with open(self.file, "r") as f:
            return json.load(f)

    def _write(self, data):
        with open(self.file, "w") as f:
            json.dump(data, f, indent=4)

    def add_request(self, req):
        data = self._read()
        data.append(req)
        self._write(data)

    def get_all(self):
        return self._read()

    def update_request(self, req_id, status, answer):
        data = self._read()
        for r in data:
            if r["id"] == req_id:
                r["status"] = status
                r["answer"] = answer
        self._write(data)

    def delete_request(self, req_id):
        data = self._read()
        updated_data = [r for r in data if r["id"] != req_id]
        self._write(updated_data)
