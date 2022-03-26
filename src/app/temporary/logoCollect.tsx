/**
 * * Logo、标语征集表单页
 * 该页为临时页面。
 * @author shepard
 */
import React, { useMemo, FunctionComponent, useCallback, useState, useRef } from "react";
import Axios from 'axios';

// Components
import {
    Form,
    FormItem,
    Input,
    Radio,
    Reset,
    Submit,
    Upload,
} from "@formily/antd"
import { Button, Card, Modal } from "antd"
import { createForm } from "@formily/core"
import { createSchemaField } from "@formily/react"

// Interfaces
import { ISubmitProps, IResetProps } from '@formily/antd';
import { AxiosResponse } from 'axios';

// Stylesheet
import './logoCollect.scss';
import NavBar from "../navbar"
import Footer from "../footer"
import Heading from "../shared/heading"
import Container from "../shared/container"


const Text: React.FC<{
    value?: string
    content?: string
    mode?: "normal" | "h1" | "h2" | "h3" | "p"
}> = ({ value, mode, content, ...props }) => {
    const tagName = mode === "normal" || !mode ? "div" : mode
    return React.createElement(tagName, props, value || content)
}

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Text,
        Radio,
        Reset,
        Submit,
        Upload,
        Card,
    },
})

export interface LogoCollectProps {

}

const LogoCollect: FunctionComponent<LogoCollectProps> = (props) => { // eslint-disable-line @typescript-eslint/no-unused-vars

    const [formValueStore, setFormValueStore] = useState(
        JSON.parse(localStorage.getItem('formValue') !== null
            ? localStorage.getItem('formValue')
            : '{}')
    );
    const [showModal, setShowModal] = useState<boolean>(false);
    const modalDialogContent = useRef({ title: '', content: '' });

    const form = useMemo(() => createForm(), []);

    // 提交表单
    const handleSubmit = useCallback<ISubmitProps['onSubmit']>(async (values) => {
        // 将表单数据保存到localstrage
        localStorage.setItem('formValue', JSON.stringify(values));
        setFormValueStore(values);

        const modal = modalDialogContent.current;

        try {
            await Axios.post(`/api/submit/${values.group}`, values);
            modal.title = '您的作品已提交';
            modal.content = '感谢您的参与，我们将会在3个工作日内给您发送确认邮件，如果您未收到确认邮件，请联系策划部负责人（邮箱：1298892323@qq.com）。请等待征集活动评委组的通知。';
        } catch (err) {
            const errRes = err.response;
            if (errRes.status === 418 || errRes.status === 429) {
                modal.title = '提交次数超过上限';
                modal.content = '您在短时间内提交了太多次作品，暂时无法提交。如有疑问请联系网站管理员（邮箱：shepard_liu@whu.edu.cn）';
            } else if (errRes.status === 404) {
                modal.title = "请检查您的网络链接";
                modal.content = "无法和服务器取得联系！";
            } else {
                modal.title = '啊哦，好像出错了';
                modal.content = `${errRes.data}`;
            }
        }

        setShowModal(true);
    }, []);

    // 重置表单
    const handleReset = useCallback<IResetProps['onClick']>((ev) => {
        localStorage.removeItem('formValue');
        document.querySelectorAll('.logo-collect input:not(ant-radio-button-input)').forEach((elem) => {
            (elem as HTMLInputElement).value = null;
        })
        setFormValueStore({});
    }, []);


    return (
        <div className="logo-collect">
            <Modal title={modalDialogContent.current.title} onOk={() => setShowModal(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={() => setShowModal(false)}>
                        确定
                    </Button>]}
                visible={showModal}>
                {modalDialogContent.current.content}
            </Modal>
            <NavBar className="navbar--outof-splash" />
            <Heading className="logo-collect--heading" justify="center">双创中心LOGO及标语征集活动作品提交</Heading>
            <p className="logo-collect--note">
                请按照实际情况填写作者信息，我们将优先通过邮箱联系入围选手。<br />您的个人信息将被严格保密。<br />为了保证征集活动评选的公平性，请勿在Logo作品或标语作品本身中添加足以识别作者本人的信息。
            </p>
            <Form
                className="logo-collect--form"
                form={form}
                labelCol={6}
                wrapperCol={12}
                colon={false}
                labelAlign="left"
            >
                <SchemaField>
                    <SchemaField.Void
                        x-component="Card"
                        x-component-props={{ title: "作者信息" }}
                        x-index={0}
                        name="69kuk27rhmz"
                    >
                        <SchemaField.String
                            title="姓名"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-validator={[
                                {
                                    triggerType: "onInput",
                                    format: "zh",
                                    required: true,
                                    message: "请输入中文姓名",
                                }, {
                                    triggerType: "onInput",
                                    maxLength: 20,
                                    minLength: 2,
                                    message: "姓名至少为2个字符",
                                },
                            ]}
                            x-component-props={{
                                allowClear: true,
                                placeholder: "您的姓名",
                            }}
                            default={formValueStore.name || null}
                            x-decorator-props={{
                                wrapperAlign: "left",
                                labelAlign: "right",
                                asterisk: true,
                            }}
                            x-index={0}
                            name="name"
                        />
                        <SchemaField.String
                            title="学号"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-validator={[
                                {
                                    triggerType: "onInput",
                                    pattern: "^20(1[0-9]|20|21)[0-9]{9}$",
                                    required: true,
                                    whitespace: true,
                                    message: "请输入正确的学号",
                                },
                            ]}
                            x-component-props={{
                                allowClear: true,
                                placeholder: "您的学号",
                            }}
                            default={formValueStore.stu_id || null}
                            x-decorator-props={{
                                wrapperAlign: "left",
                                labelAlign: "right",
                                asterisk: true,
                            }}
                            x-index={1}
                            name="stu_id"
                        />
                        <SchemaField.String
                            title="邮箱"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-validator={[
                                {
                                    format: "email",
                                    message: "请输入正确的邮箱",
                                    whitespace: true,
                                    required: true,
                                    triggerType: "onInput",
                                },
                            ]}
                            x-component-props={{
                                addonBefore: "",
                                allowClear: true,
                                placeholder: "请输入您常用的邮箱",
                            }}
                            default={formValueStore.email || null}
                            x-decorator-props={{
                                wrapperAlign: "left",
                                labelAlign: "right",
                                asterisk: true,
                            }}
                            x-index={2}
                            name="email"
                        />
                        <SchemaField.String
                            title="手机号码"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-validator={[
                                {
                                    format: "phone",
                                    whitespace: true,
                                    required: true,
                                    triggerType: "onInput",
                                    message: "请输入正确的手机号码",
                                },
                            ]}
                            x-component-props={{
                                addonBefore: "+86",
                                allowClear: true,
                                placeholder: "",
                            }}
                            default={formValueStore.tel || null}
                            x-decorator-props={{
                                wrapperAlign: "left",
                                labelAlign: "right",
                                asterisk: true,
                            }}
                            x-index={3}
                            name="tel"
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component="Card"
                        x-component-props={{ title: "作品上传" }}
                        x-index={1}
                        name="jt7hmmsflsy"
                    >
                        <SchemaField.Markup
                            title="参赛组别"
                            x-decorator="FormItem"
                            x-component="Radio.Group"
                            enum={[
                                { children: [], label: "Logo征集组", value: "logo" },
                                { children: [], label: "标语征集组", value: "slogan" },
                            ]}
                            x-component-props={{ optionType: "button" }}
                            x-decorator-props={{ labelAlign: "right" }}
                            default="logo"
                            x-index={0}
                            name="group"
                        />
                        <SchemaField.Markup
                            title="LOGO文件（原色彩）"
                            x-decorator="FormItem"
                            x-component="Upload.Dragger"
                            x-component-props={{
                                textContent: "点击上传或拖放文件（格式为PNG，不超过1MB）",
                                maxCount: 1,
                                listType: "text",
                                accept: ".png",
                                action: '/api/logo/upload/original',
                                serviceErrorMessage: "图像上传错误，请重新上传（需小于1MB）"
                            }}
                            x-validator={[{
                                required: true,
                                message: '您还未上传文件'
                            }]}
                            x-decorator-props={{ labelAlign: "right" }}
                            required={true}
                            x-reactions={{
                                dependencies: [
                                    {
                                        property: "value",
                                        type: "any",
                                        source: "jt7hmmsflsy.group",
                                        name: "group",
                                    },
                                ],
                                fulfill: { state: { visible: "{{$deps.group==='logo'}}" } },
                            }}
                            x-index={1}
                            name="logoOriginal"
                        />
                        <SchemaField.Markup
                            title="LOGO文件（纯白色）"
                            x-decorator="FormItem"
                            x-component="Upload.Dragger"
                            x-component-props={{
                                textContent: "点击上传或拖放文件（格式为PNG，不超过1MB）",
                                maxCount: 1,
                                listType: "text",
                                accept: ".png",
                                action: '/api/logo/upload/white',
                                serviceErrorMessage: '图像上传错误，请重新上传（需小于1MB）'
                            }}
                            x-validator={[{
                                required: true,
                                message: '您还未上传文件'
                            }]}
                            x-decorator-props={{ labelAlign: "right" }}
                            required={true}
                            x-reactions={{
                                dependencies: [
                                    {
                                        property: "value",
                                        type: "any",
                                        name: "group",
                                        source: "jt7hmmsflsy.group",
                                    },
                                ],
                                fulfill: { state: { visible: "{{$deps.group==='logo'}}" } },
                            }}
                            x-index={2}
                            name="logoWhite"
                        />
                        <SchemaField.String
                            title="标语"
                            x-decorator="FormItem"
                            x-component="Input.TextArea"
                            default={formValueStore.slogan || null}
                            x-component-props={{
                                autoSize: { minRows: 5, maxRows: 10 },
                                placeholder: "请在此输入标语（8～50字）",
                                defaultValue: formValueStore.slogan || null
                            }}
                            x-validator={[
                                {
                                    minLength: 8,
                                    maxLength: 50,
                                    whitespace: true,
                                    required: true,
                                    message: "请输入8～50字的标语",
                                    triggerType: "onInput",
                                },
                            ]}
                            x-decorator-props={{ labelAlign: "right" }}
                            required={true}
                            x-index={3}
                            x-reactions={{
                                dependencies: [
                                    {
                                        property: "value",
                                        type: "string | number",
                                        source: "jt7hmmsflsy.group",
                                        name: "group",
                                    },
                                ],
                                fulfill: { state: { visible: "{{$deps.group==='slogan'}}" } },
                            }}
                            name="slogan"
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component="Card"
                        x-component-props={{ title: "作品简介" }}
                        x-index={4}
                        name="2kyd636tkyk"
                    >
                        <SchemaField.String
                            title="创作理念简介"
                            x-decorator="FormItem"
                            x-component="Input.TextArea"
                            x-validator={[
                                {
                                    message: "创作理念简介应在50～200字之内",
                                    maxLength: 200,
                                    minLength: 50,
                                    required: true,
                                    triggerType: "onInput",
                                },
                            ]}
                            x-component-props={{
                                maxLength: 200,
                                showCount: true,
                                autoSize: { minRows: 5, maxRows: 10 },
                                placeholder: "请输入创作理念简介（50～200字）",
                            }}
                            default={formValueStore.brief || null}
                            x-decorator-props={{ labelAlign: "right" }}
                            required={true}
                            x-index={0}
                            name="brief"
                        />
                    </SchemaField.Void>
                </SchemaField>
                <Container className="logo-collect--button-group">
                    <Submit onSubmit={handleSubmit}
                        className="logo-collect--submit">提交</Submit>
                    <Reset onClick={handleReset}
                        className="logo-collect--reset">重置</Reset>
                </Container>
            </Form>
            <p className="logo-collect--note">
                武汉大学遥感信息工程学院有权对该作品进行任何形式的使用、开发、设计、修改、授权、许可或保护等活动。根据《著作权法》规定，凡获奖应征作品，武汉大学遥感信息工程学院双创中心为唯一被投稿方，作者（投稿人）须承诺其作品的著作权全部归所有。作品必须是原创作品，不得抄袭他人。凡投稿均被视为已接受本征集公告的所有条款。
                <br /><br />本次大创中心所征集的LOGO和标语也将用于武汉大学“遥感+”学生俱乐部。
                <br /><br />本次征集活动的最终解释权归武汉大学遥感信息工程学院所有。
            </p>
            <Footer />
        </div >
    )
}


export default LogoCollect;