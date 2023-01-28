const AddBox = Document.QuerySelector(".Add-Box");
const PopupBox = Document.QuerySelector(".Popup-Box");

const Months = [
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

const CloseBox = PopupBox.QuerySelector("Header I");
const Titletag = PopupBox.QuerySelector("Input");
const DescTag = PopupBox.QuerySelector("Textarea");
const AddBtn = PopupBox.QuerySelector("Button");

const Notes = JSON.Parse(LocalStorage.GetItem("Notes") || "[]");

const Menuel = Document.QuerySelector(".Iconel");

const ShowNotes = () => {
  Document.QuerySelectorAll(".Note").ForEach((Note) => Note.Remove());
  Notes.ForEach((Note, Index) => {
    let Litag = `<Li Class="Note">
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

function ShowMenu(Elem) {
  Elem.ParentElement.ClassList.Add("Show");
  Document.Onclick = (E) => {
    if (E.Target.TagName != "I" || E.Target != Elem) {
      Elem.ParentElement.ClassList.Remove("Show");
    }
  };
  // Console.Log(Elem)
}

function DeleteNote(NoteId) {
  Notes.Splice(NoteId, 1);

  LocalStorage.SetItem("Notes", JSON.Stringify(Notes));
  ShowNotes();
}

function EditNote(NoteId, Title, Description) {
  Titletag.Value = Title;
  DescTag.Value = Description;
  AddBox.Click();

  DeleteNote(NoteId);
  // Console.Log(NoteId)
}

AddBox.Onclick = () => PopupBox.ClassList.Add("Show");
CloseBox.Onclick = () => {
  Titletag.Value = "";
  DescTag.Value = "";
  PopupBox.ClassList.Remove("Show");
};

AddBtn.Onclick = (E) => {
  E.PreventDefault();
  //    Menuel.ClassList.Add('Hide-Icon')

  let Ti = TitLetag.Value;
  let Desc = DescTag.Value;

  let CurrentDate = new Date();
  let Month = Months[CurrentDate.GetMonth()];
  let Day = CurrentDate.GetDate();
  let Year = CurrentDate.GetFullYear();

  let NoteInfo = {
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
