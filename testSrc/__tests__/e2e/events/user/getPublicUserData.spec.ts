import { PublicUserData } from 'utility-store/lib/types';

import { services } from '~/services';

import { assertionInitializerHelper } from '@/classes/AssertionInitializerHelper';
import { e2eFailTestInitializerHelper } from '@/classes/E2eFailTestInitializerHelper';
import { randomMaker } from '@/classes/RandomMaker';
import { utils } from '@/utils';

describe('getUserData success tests', () => {
	it('should get currentUser data', async () => {
		const { socket } = await randomMaker.user();
		const requester = utils.requesterCollection.getPublicUserData(socket);

		const users = await randomMaker.users(10);

		for (const { user: targetUserData } of users) {
			const {
				data: { publicUserData },
			} = await requester.sendFullFeaturedRequest({
				userId: targetUserData.userId,
			});

			const targetUserDataInDb = (await services.findOneUser({
				userId: targetUserData.userId,
			}))!;

			testPublicUserData(targetUserDataInDb, publicUserData as PublicUserData);
			testPublicUserData(targetUserData, publicUserData as PublicUserData);
		}
	});
});

const testPublicUserData = (
	equalValue: PublicUserData,
	testValue: PublicUserData
) => {
	assertionInitializerHelper()
		.firstName({
			equalValue: equalValue.firstName,
			testValue: testValue.firstName,
		})
		.lastName({
			equalValue: equalValue.lastName,
			testValue: testValue.lastName,
		})
		.bio({
			equalValue: equalValue.bio,
			testValue: testValue.bio,
		})
		.username({
			equalValue: equalValue.username,
			testValue: testValue.username,
		})
		.userId({
			equalValue: equalValue.userId,
			testValue: testValue.userId,
		});
};

await utils.asyncDescribe('getPublicUserData fail tests', async () => {
	const { requester } = await utils.setupRequester(
		utils.requesterCollection.getPublicUserData
	);

	return () => {
		const data = {
			userId: randomMaker.userId(),
		};

		e2eFailTestInitializerHelper(requester).input(data).userId(data);
	};
});
