Const AddBox = Document.QuerySelector(".Add-Box");
Const PopupBox = Document.QuerySelector(".Popup-Box");

Const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

Const CloseBox = PopupBox.QuerySelector("Header I");
Const TitleTag = PopupBox.QuerySelector("Input");
Const DescTag = PopupBox.QuerySelector("Textarea");
Const AddBtn = PopupBox.QuerySelector("Button");

Const Notes = JSON.Parse(LocalStorage.GetItem("Notes") || "[]");

Const Menuel = Document.QuerySelector(".Iconel");

Const ShowNotes = () => {
  Document.QuerySelectorAll(".Note").ForEach((Note) => Note.Remove());
  Notes.ForEach((Note, Index) => {
    Let Litag = `<Li Class="Note">
                            <Div Class="Details">
                                <P> ${Note.Title} </P>
                                <Span>${Note.Description}
                                </Span>
                            </Div>
                            <Div Class="Bottom-Content">
                                <Span>${Note.Date}</Span>
                                <Div Class="Settings">
                                    <I Onclick=ShowMenu(This) Class="Fa-Solid Fa-Ellipsis Iconel"></I>
                                    <Ul Class="Menu">
                                        <Li Onclick="EditNote(${Index},'${Note.Title}','${Note.Description}')"><I Class="Fa-Light Fa-Pen"></I>Edit</Li>
                                        <Li Onclick="DeleteNote(${Index})"><I Class="Fa-Duotone Fa-Trash"></I>Delete</Li>
                                    </Ul>
                                </Div>
                            </Div>
                     </Li>`;

    AddBox.InsertAdjacentHTML("Afterend", Litag);
  });
};

Function ShowMenu(Elem) {
  Elem.ParentElement.ClassList.Add("Show");
  Document.Onclick = (E) => {
    If (E.Target.TagName != "I" || E.Target != Elem) {
      Elem.ParentElement.ClassList.Remove("Show");
    }
  };
  // Console.Log(Elem)
}

Function DeleteNote(NoteId) {
  Notes.Splice(NoteId, 1);

  LocalStorage.SetItem("Notes", JSON.Stringify(Notes));
  ShowNotes();
}

Function EditNote(NoteId, Title, Description) {
  TitleTag.Value = Title;
  DescTag.Value = Description;
  AddBox.Click();

  DeleteNote(NoteId);
  // Console.Log(NoteId)
}

AddBox.Onclick = () => PopupBox.ClassList.Add("Show");
CloseBox.Onclick = () => {
  TitleTag.Value = "";
  DescTag.Value = "";
  PopupBox.ClassList.Remove("Show");
};

AddBtn.Onclick = (E) => {
  E.PreventDefault();
  //    Menuel.ClassList.Add('Hide-Icon')

  Let Ti = TitleTag.Value;
  Let Desc = DescTag.Value;

  Let CurrentDate = New Date();
  Let Month = Months[CurrentDate.GetMonth()];
  Let Day = CurrentDate.GetDate();
  Let Year = CurrentDate.GetFullYear();

  Let NoteInfo = {
    Title: Ti,
    Description: Desc,
    Date: `${Day} ${Month} ${Year}`,
  };

  Notes.Push(NoteInfo);

  LocalStorage.SetItem("Notes", JSON.Stringify(Notes));

  CloseBox.Click();

  //    Menuel.ClassList.Remove('Hide-Icon')
  ShowNotes();
};

ShowNotes();