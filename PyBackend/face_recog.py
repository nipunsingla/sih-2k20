import face_recognition

find_pic = face_recognition.load_image_file("find/salman.jpg")
findencoding = face_recognition.face_encodings(find_pic)[0]

# my_face_encoding now contains a universal 'encoding' of my facial features that can be compared to any other picture of a face!

unknown = face_recognition.load_image_file("find/.jpg")
unknownencoding = face_recognition.face_encodings(unknown)[0]

# Now we can see the two face encodings are of the same person with `compare_faces`!

results = face_recognition.compare_faces([findencoding], unknownencoding)

if results[0] == True:
    print("It's a picture of me!")
else:
    print("It's not a picture of me!")
