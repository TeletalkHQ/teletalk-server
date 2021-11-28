//eslint-disable-next-line

const ids = [
	"4ed3ede8844f0f351100000c",
	"4ed3f117a844e0471100000d",
	"4ed3f18132f50c491100000e",
];

Model.find()
	.where("_id")
	.in(ids)
	.exec((err, records) => {});

const records = await Model.find().where("_id").in(ids).exec();

const records = await Model.find({ _id: { $in: ids } });

model.find(
	{
		_id: {
			$in: [
				mongoose.Types.ObjectId("4ed3ede8844f0f351100000c"),
				mongoose.Types.ObjectId("4ed3f117a844e0471100000d"),
				mongoose.Types.ObjectId("4ed3f18132f50c491100000e"),
			],
		},
	},
	function (err, docs) {
		console.log(docs);
	},
);
